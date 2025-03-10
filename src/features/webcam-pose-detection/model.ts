import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "core-js/stable";
import Webcam from "react-webcam";

export class PoseDetectionModel {
  detector: poseDetection.PoseDetector | null = null;

  async loadModel() {
    await tf.ready();
    this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
    console.log("MoveNet model loaded successfully");
  }

  async detectPose(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    if (!this.detector) return;

    const poses = await this.detector.estimatePoses(video);
    const ctx = canvas.getContext("2d");
    if (ctx && poses.length > 0) {
      const pose = poses[0];

      // Get original video dimensions
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Get new canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate scale factors
      const scaleX = canvasWidth / videoWidth;
      const scaleY = canvasHeight / videoHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      this.drawKeypoints(pose.keypoints, 0.2, ctx, scaleX, scaleY);
      this.drawSkeleton(pose.keypoints, 0.2, ctx, scaleX, scaleY);
    } else {
      console.error("Unable to get canvas context or no poses detected");
    }
  }

  drawKeypoints(
    keypoints: poseDetection.Keypoint[],
    minConfidence: number,
    ctx: CanvasRenderingContext2D,
    scaleX: number,
    scaleY: number,
  ) {
    keypoints.forEach((keypoint, index) => {
      const score = keypoint.score ?? 0;
      if (score >= minConfidence) {
        const { y, x } = keypoint;
        ctx.beginPath();
        ctx.arc(x * scaleX, y * scaleY, 5, 0, 2 * Math.PI);
        // Assign colors based on keypoint index for specific points
        ctx.fillStyle = this.getColorForKeypoint(index);
        ctx.fill();
      }
    });
  }

  getColorForKeypoint(index: number) {
    if (index === 0) return "green"; // Nose
    if (index === 1 || index === 2) return "yellow"; // Eyes
    if (index === 3 || index === 4) return "red"; // Ears
    return "green"; // Other points
  }

  drawSkeleton(
    keypoints: poseDetection.Keypoint[],
    minConfidence: number,
    ctx: CanvasRenderingContext2D,
    scaleX: number,
    scaleY: number,
  ) {
    const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(
      poseDetection.SupportedModels.MoveNet,
    );

    // Draw body skeleton
    adjacentKeyPoints.forEach(([i, j]) => {
      const p1 = keypoints[i];
      const p2 = keypoints[j];
      const score1 = p1.score ?? 0;
      const score2 = p2.score ?? 0;
      if (
        score1 >= minConfidence &&
        score2 >= minConfidence &&
        p1.x !== 0 &&
        p1.y !== 0 &&
        p2.x !== 0 &&
        p2.y !== 0
      ) {
        ctx.beginPath();
        ctx.moveTo(p1.x * scaleX, p1.y * scaleY);
        ctx.lineTo(p2.x * scaleX, p2.y * scaleY);
        ctx.lineWidth = 2; // Adjust line width if needed
        ctx.strokeStyle = "white"; // White color for skeleton lines
        ctx.stroke();
        console.log(`Drawing skeleton from (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y})`);
      } else {
        console.log(`Invalid skeleton position: (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y})`);
      }
    });
  }

  async run(webcamRef: React.RefObject<Webcam>, canvasRef: React.RefObject<HTMLCanvasElement>) {
    if (!this.detector) await this.loadModel();

    const detect = async () => {
      if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        if (video.readyState === 4) {
          await this.detectPose(video, canvas);
        }
      }
      requestAnimationFrame(detect);
    };

    detect();
  }
}
