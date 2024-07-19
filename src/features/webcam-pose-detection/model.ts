import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

export class PoseDetectionModel {
	detector: poseDetection.PoseDetector | null = null;

	async loadModel() {
		await tf.ready();
		this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
		console.log("MoveNet model loaded successfully");
	}

	async detectPose(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
		if (!this.detector) return;

		const poses = await this.detector.estimatePoses(video);
		const ctx = canvas.getContext("2d");
		if (ctx && poses.length > 0) {
			const pose = poses[0];
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;

			// Set canvas dimensions to match video dimensions
			canvas.width = videoWidth;
			canvas.height = videoHeight;
			ctx.clearRect(0, 0, videoWidth, videoHeight);

			this.drawKeypoints(pose.keypoints, 0.2, ctx);
			this.drawSkeleton(pose.keypoints, 0.2, ctx);
		} else {
			console.error("Unable to get canvas context or no poses detected");
		}
	}

	drawKeypoints(
		keypoints: poseDetection.Keypoint[],
		minConfidence: number,
		ctx: CanvasRenderingContext2D,
	) {
		keypoints.forEach((keypoint, index) => {
			const score = keypoint.score ?? 0;
			if (score >= minConfidence) {
				const { y, x } = keypoint;
				if (x !== 0 && y !== 0) {
					ctx.beginPath();
					ctx.arc(x, y, 5, 0, 2 * Math.PI);
					// Assign colors based on keypoint index for specific points
					if (index === 0) {
						ctx.fillStyle = "green"; // Green color for nose
					} else if (index === 1 || index === 2) {
						ctx.fillStyle = "yellow"; // Yellow color for eyes
					} else if (index === 3 || index === 4) {
						ctx.fillStyle = "red"; // Red color for ears
					} else {
						ctx.fillStyle = "green"; // Green color for the rest
					}
					ctx.fill();
					console.log(`Drawing keypoint at (${x}, ${y}) with confidence ${score}`);
				} else {
					console.log(`Invalid keypoint position: (${x}, ${y})`);
				}
			}
		});
	}

	drawSkeleton(
		keypoints: poseDetection.Keypoint[],
		minConfidence: number,
		ctx: CanvasRenderingContext2D,
	) {
		const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(
			poseDetection.SupportedModels.MoveNet,
		);
		const faceKeyPoints = [3, 1, 0, 2, 4]; // Key points for face (ears, eyes, nose)

		// Draw body skeleton
		adjacentKeyPoints.forEach(([i, j]) => {
			const p1 = keypoints[i];
			const p2 = keypoints[j];
			const score1 = p1.score ?? 0;
			const score2 = p2.score ?? 0;
			if (
				score1 >= minConfidence &&
				score2 >= minConfidence &&
				p1.x !== 0 &&
				p1.y !== 0 &&
				p2.x !== 0 &&
				p2.y !== 0
			) {
				ctx.beginPath();
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineWidth = 2; // Adjust line width if needed
				ctx.strokeStyle = "white"; // White color for skeleton lines
				ctx.stroke();
				console.log(`Drawing skeleton from (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y})`);
			} else {
				console.log(`Invalid skeleton position: (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y})`);
			}
		});

		// Draw a single line connecting face key points
		ctx.beginPath();
		faceKeyPoints.forEach((index, i) => {
			const keypoint = keypoints[index];
			const score = keypoint.score ?? 0;
			if (score >= minConfidence && keypoint.x !== 0 && keypoint.y !== 0) {
				if (i === 0) {
					ctx.moveTo(keypoint.x, keypoint.y);
				} else {
					ctx.lineTo(keypoint.x, keypoint.y);
				}
			}
		});
		ctx.lineWidth = 2; // Adjust line width if needed
		ctx.strokeStyle = "white"; // White color for face lines
		ctx.stroke();
		console.log("Drawing face line connecting key points");
	}

	async run(
		videoRef: React.RefObject<HTMLVideoElement>,
		canvasRef: React.RefObject<HTMLCanvasElement>,
	) {
		if (!this.detector) await this.loadModel();
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
