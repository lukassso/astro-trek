import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tmPose from "@teachablemachine/pose";

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const modelRef = useRef<tmPose.CustomPoseNet | null>(null);
	const maxPredictionsRef = useRef<number>(0);

	useEffect(() => {
		const loadModel = async () => {
			const modelURL = "./model.json";
			const metadataURL = "./metadata.json";
			modelRef.current = await tmPose.load(modelURL, metadataURL);
			maxPredictionsRef.current = modelRef.current.getTotalClasses();
			console.log("Model loaded");
		};

		loadModel();
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
					width={540}
					height={480}
				/>
			</div>
		</div>
	);
};

export default Camera;
