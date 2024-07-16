import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const drawKeypoints = (keypoints: posenet.Keypoint[], minConfidence: number, ctx: CanvasRenderingContext2D): void => {
  keypoints.forEach((keypoint) => {
    if (keypoint.score >= minConfidence) {
      const { y, x } = keypoint.position;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  });
};

const drawSkeleton = (keypoints: posenet.Keypoint[], minConfidence: number, ctx: CanvasRenderingContext2D): void => {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    const [p1, p2] = keypoints;
    ctx.beginPath();
    ctx.moveTo(p1.position.x, p1.position.y);
    ctx.lineTo(p2.position.x, p2.position.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "aqua";
    ctx.stroke();
  });
};

const getWebcamTensor = (webcamRef: React.RefObject<Webcam>): tf.Tensor | null => {
  if (webcamRef.current?.video) {
    const video = webcamRef.current.video;
    return tf.expandDims(tf.browser.fromPixels(video), 0);
  }
  return null;
};

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [net, setNet] = useState<posenet.PoseNet | null>(null);

  const loadPosenetModel = async (): Promise<void> => {
    try {
      await tf.setBackend('webgl');
      console.log("Using backend:", tf.getBackend());
      const loadedNet = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.5,
      });
      setNet(loadedNet);
      console.log("PoseNet model loaded successfully");
    } catch (error) {
      console.error("Error loading PoseNet model:", error);
    }
  };

  useEffect(() => {
    loadPosenetModel();
  }, []);

  const detect = async (): Promise<void> => {
    if (
      net &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }

      const webcamTensor = getWebcamTensor(webcamRef);

      if (webcamTensor) {
        try {
          const pose = await net.estimateSinglePose(webcamTensor);
          console.log("Pose detected:", pose);

          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, videoWidth, videoHeight);

            // Debugging: Draw a simple rectangle and text
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fillRect(10, 10, 100, 100);
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText('Debug Text', 10, 150);

            // Drawing keypoints and skeleton
            drawKeypoints(pose.keypoints, 0.5, ctx);
            drawSkeleton(pose.keypoints, 0.5, ctx);
          } else {
            console.error("Unable to get canvas context");
          }
        } catch (error) {
          console.error("Error during pose estimation:", error);
        } finally {
          tf.dispose(webcamTensor); // Dispose tensor to free up memory
        }
      }
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const runPoseDetection = async () => {
      await detect();
      animationFrameId = requestAnimationFrame(runPoseDetection);
    };

    if (net) {
      runPoseDetection();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [net]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative" style={{ width: '640px', height: '480px' }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={videoConstraints}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default Camera;
