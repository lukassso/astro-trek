import React, { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { DetectionModel } from "@/features/webcam-object-detection/model";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  useEffect(() => {
    const model = new DetectionModel();
    model.run(webcamRef, canvasRef);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="relative rounded-xl border-2 border-gray-300 p-4">
        <Webcam
          ref={webcamRef}
          className="webcam-detection rounded-xl"
          videoConstraints={videoConstraints}
        />
        <canvas
          ref={canvasRef}
          className="canvas-detection z-1 border-1 absolute left-4 top-4 rounded-xl"
        />
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={capturePhoto}
          className="z-20 mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Capture
        </button>
        <button
          onClick={() => setUrl(null)}
          className="mt-2 rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Refresh
        </button>
        {url && (
          <div className="mt-4">
            <img src={url} alt="Screenshot" className="rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
