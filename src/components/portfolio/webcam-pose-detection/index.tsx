import type React from "react";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { PoseDetectionModel } from "@/features/webcam-pose-detection/model";
import LoadingOverlay from "@/components/portfolio/movie-app/components/common/LoadingOverlay";

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    const adjustCanvasSize = () => {
        if (webcamRef.current && canvasRef.current) {
            const video = webcamRef.current.video;

            if (video && video.readyState === 4) {
                const aspectRatio = video.videoWidth / video.videoHeight;
                const container = canvasRef.current.parentElement;

                if (container) {
                    const containerWidth = container.clientWidth;
                    const newWidth = containerWidth;
                    const newHeight = containerWidth / aspectRatio;

                    canvasRef.current.width = newWidth;
                    canvasRef.current.height = newHeight;

                    // Trigger a rerender of the canvas contents
                    const ctx = canvasRef.current.getContext("2d");
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

    const handleLoadedData = () => {
        adjustCanvasSize();
        setIsLoading(false); // Hide loading overlay once the webcam is ready
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative rounded-xl border-2 border-gray-300 p-4">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl">
                        <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"/>
                        <p className="mt-4 p-3 text-center text-white text-sm">
                        Kindly enable camera access on your device.<br />
                        Loading the LLM model may require some patience, as it depends on your internet speed.
                        </p>
                    </div>
                )}
                <Webcam
                    ref={webcamRef}
                    className="rounded-xl"
                    onLoadedData={handleLoadedData}
                />
                <canvas
                    ref={canvasRef}
                    className="z-3 absolute left-0 top-0 rounded-xl"
                />
            </div>
        </div>
    );
};

export default Camera;
