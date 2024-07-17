import React, { useRef, useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";

const videoConstraints = {
	width: 640,
	height: 480,
	facingMode: "user",
};

class PoseDetectionModel {
	net: posenet.PoseNet | null = null;

	async loadModel() {
		await tf.ready();
		await tf.setBackend("webgl");
		this.net = await posenet.load({
			inputResolution: { width: 640, height: 480 },
			scale: 0.5,
		});
		console.log("PoseNet model loaded successfully");
	}

	async detectPose(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
		if (!this.net) return;

		const pose = await this.net.estimateSinglePose(video);
		const ctx = canvas.getContext("2d");
		if (ctx) {
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;

			canvas.width = videoWidth;
			canvas.height = videoHeight;
			ctx.clearRect(0, 0, videoWidth, videoHeight);

			this.drawKeypoints(pose.keypoints, 0.2, ctx);
			this.drawSkeleton(pose.keypoints, 0.2, ctx);
		} else {
			console.error("Unable to get canvas context");
		}
	}

	drawKeypoints(
		keypoints: posenet.Keypoint[],
		minConfidence: number,
		ctx: CanvasRenderingContext2D,
	) {
		keypoints.forEach((keypoint) => {
			if (keypoint.score >= minConfidence) {
				const { y, x } = keypoint.position;
				if (x !== 0 && y !== 0) {
					ctx.beginPath();
					ctx.arc(x, y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "red";
					ctx.fill();
					console.log(`Drawing keypoint at (${x}, ${y}) with confidence ${keypoint.score}`);
				} else {
					console.log(`Invalid keypoint position: (${x}, ${y})`);
				}
			}
		});
	}

	drawSkeleton(
		keypoints: posenet.Keypoint[],
		minConfidence: number,
		ctx: CanvasRenderingContext2D,
	) {
		const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

		adjacentKeyPoints.forEach((keypoints) => {
			const [p1, p2] = keypoints;
			if (
				p1.position.x !== 0 &&
				p1.position.y !== 0 &&
				p2.position.x !== 0 &&
				p2.position.y !== 0
			) {
				ctx.beginPath();
				ctx.moveTo(p1.position.x, p1.position.y);
				ctx.lineTo(p2.position.x, p2.position.y);
				ctx.lineWidth = 4;
				ctx.strokeStyle = "aqua";
				ctx.stroke();
				console.log(
					`Drawing skeleton from (${p1.position.x}, ${p1.position.y}) to (${p2.position.x}, ${p2.position.y})`,
				);
			} else {
				console.log(
					`Invalid skeleton position: (${p1.position.x}, ${p1.position.y}) to (${p2.position.x}, ${p2.position.y})`,
				);
			}
		});
	}

	async run(
		videoRef: React.RefObject<HTMLVideoElement>,
		canvasRef: React.RefObject<HTMLCanvasElement>,
	) {
		if (!this.net) await this.loadModel();
		const video = videoRef.current;
		const canvas = canvasRef.current;

		if (video && canvas) {
			const detect = async () => {
				if (video.readyState === 4) {
					await this.detectPose(video, canvas);
				}
				requestAnimationFrame(detect);
			};
			detect();
		}
	}
}

const Camera: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [model, setModel] = useState<PoseDetectionModel | null>(null);

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
		// setModel(newModel);
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
