import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { PoseDetectionModel } from "@/features/webcam-pose-detection/model";

const videoConstraints = {
	width: 640,
	height: 480,
	facingMode: "user",
};

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const newModel = new PoseDetectionModel();
		newModel.run(webcamRef, canvasRef);
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center">
			<div className="relative rounded-xl border-2 border-gray-300 p-4">
				<Webcam ref={webcamRef} className="rounded-xl" videoConstraints={videoConstraints} />
				<canvas ref={canvasRef} className="z-3 absolute left-0 top-0 rounded-xl"></canvas>
			</div>
		</div>
	);
};

export default Camera;
