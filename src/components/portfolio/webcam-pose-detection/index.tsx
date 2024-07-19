import React, { useRef, useEffect } from "react";
import { PoseDetectionModel } from "@/features/webcam-pose-detection/model";

const videoConstraints = {
	width: 640,
	height: 480,
};

const Camera: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const setupCamera = async () => {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: videoConstraints,
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.play();
				}
			}
		};

		setupCamera();
	}, [videoRef]);

	useEffect(() => {
		const newModel = new PoseDetectionModel();
		newModel.run(videoRef, canvasRef);
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center">
			<div className="aspect-ratio-box relative h-full max-h-full w-full max-w-full">
				<video
					ref={videoRef}
					className="absolute left-0 top-0 h-full w-full rounded-xl object-contain"
					width={videoConstraints.width}
					height={videoConstraints.height}
				/>
				<canvas
					ref={canvasRef}
					className="absolute left-0 top-0 h-full w-full rounded-xl"
					width={videoConstraints.width}
					height={videoConstraints.height}
				/>
			</div>
		</div>
	);
};

export default Camera;
