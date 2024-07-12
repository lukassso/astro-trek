import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

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
		</div>
	);
};

export default Camera;
