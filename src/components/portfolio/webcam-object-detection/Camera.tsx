import type React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { DetectionModel } from "@/features/webcam-object-detection/model";
import LoadingOverlay from "../movie-app/components/common/LoadingOverlay";

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [url, setUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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

	const handleLoadedData = () => {
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col items-center">
			<div className="relative rounded-xl border-2 border-gray-300 p-4">
			{isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl">
                        <LoadingOverlay />
                        <p className="mt-4 p-3 text-center text-white text-sm">
                        Kindly enable camera access on your device.<br />
                        Loading the LLM model may require some patience, as it depends on your internet speed.
                        </p>
                    </div>
                )}
				<Webcam
					ref={webcamRef}
					className="webcam-detection rounded-xl"
					videoConstraints={videoConstraints}
					onLoadedData={handleLoadedData}
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
