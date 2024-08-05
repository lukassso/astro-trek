import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { PoseDetectionModel } from "@/features/webcam-pose-detection/model";

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const adjustCanvasSize = () => {
    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current.video;

      if (video && video.readyState === 4) {
        const aspectRatio = video.videoWidth / video.videoHeight;
        const container = canvasRef.current.parentElement;

        if (container) {
          const containerWidth = container.clientWidth;
          let newWidth = containerWidth;
          let newHeight = containerWidth / aspectRatio;

          canvasRef.current.width = newWidth;
          canvasRef.current.height = newHeight;

          // Trigger a rerender of the canvas contents
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, newWidth, newHeight); // Clear canvas before redraw
          }
        }
      }
    }
  };

  useEffect(() => {
    const newModel = new PoseDetectionModel();
    newModel.run(webcamRef, canvasRef);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      adjustCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    adjustCanvasSize(); // Initial adjustment

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="relative rounded-xl border-2 border-gray-300 p-4">
        <Webcam
          ref={webcamRef}
          className="rounded-xl"
          onLoadedData={adjustCanvasSize}
        />
        <canvas ref={canvasRef} className="z-3 absolute left-0 top-0 rounded-xl"></canvas>
      </div>
    </div>
  );
};

export default Camera;
