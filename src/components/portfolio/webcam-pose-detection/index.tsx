import React, { useRef, useEffect} from "react";
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
			<div className="relative rounded-xl border-2 border-gray-300 p-4 ">
				<video
					ref={videoRef}
					className="left-0 top-0 z-10 rounded-xl"
					width={videoConstraints.width}
					height={videoConstraints.height}
				/>
				<canvas ref={canvasRef} className="border-1 absolute left-0 top-0 z-20 rounded-xl" />
			</div>
		</div>
	);
};

export default Camera;
