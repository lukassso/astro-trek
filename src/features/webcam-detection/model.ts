import * as tf from "@tensorflow/tfjs";
import "core-js/stable";
import type { Detections, WebcamRef, CanvasRef } from "./types";
import { CLASSES } from "./const";

export class DetectionModel {
	async loadModel(): Promise<tf.GraphModel | undefined> {
		try {
			await tf.ready();
			const modelPath = "https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1";
			return await tf.loadGraphModel(modelPath, { fromTFHub: true });
		} catch (e) {
			console.error("Error loading model", e);
			throw e;
		}
	}

	getWebcamTensor(webcamRef: WebcamRef): tf.Tensor | null {
		if (webcamRef.current?.video) {
			const video = webcamRef.current.video;
			return tf.expandDims(tf.browser.fromPixels(video), 0);
		}
		return null;
	}

	async getDetections(model: tf.GraphModel, tensor: tf.Tensor): Promise<Detections> {
		const results = (await model.executeAsync(tensor)) as tf.Tensor[];
		const prominentDetection = tf.topk(results[0]);
		const justBoxes = results[1].squeeze() as tf.Tensor;
		const justValues = prominentDetection.values.squeeze() as tf.Tensor;

		const [maxIndices, scores, boxes] = await Promise.all([
			prominentDetection.indices.data() as Promise<Int32Array>,
			justValues.array() as Promise<number[]>,
			justBoxes.array() as Promise<number[][]>,
		]);

		const nmsDetections = await tf.image.nonMaxSuppressionWithScoreAsync(
			justBoxes as tf.Tensor2D,
			justValues as tf.Tensor1D,
			20,
			0.5,
			0.4,
			1,
		);

		const chosen = (await nmsDetections.selectedIndices.data()) as Int32Array;

		tf.dispose([
			results[0],
			results[1],
			prominentDetection.indices,
			prominentDetection.values,
			justBoxes,
			justValues,
			tensor,
		]);

		return { chosen, maxIndices, scores, boxes };
	}

	drawDetections(
		ctx: CanvasRenderingContext2D,
		detections: Detections,
		webcamHeight: number,
		webcamWidth: number,
	): void {
		const { chosen, maxIndices, scores, boxes } = detections;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		chosen.forEach((detection) => {
			ctx.strokeStyle = "#0F0";
			ctx.lineWidth = 2;
			ctx.globalCompositeOperation = "destination-over";
			const detectedIndex = maxIndices[detection];
			const detectedClass = CLASSES[detectedIndex].toUpperCase();
			const detectedScore = scores[detection];
			const dBox = boxes[detection];

			const startY = dBox[0] * webcamHeight;
			const startX = dBox[1] * webcamWidth;
			const height = (dBox[2] - dBox[0]) * webcamHeight;
			const width = (dBox[3] - dBox[1]) * webcamWidth;

			ctx.strokeRect(startX, startY, width, height);

			ctx.globalCompositeOperation = "source-over";
			ctx.fillStyle = "#0F0";
			const textHeight = 24;
			const textPad = 4;
			const label = `${detectedClass} ${Math.round(detectedScore * 100)}%`;
			const textWidth = ctx.measureText(label).width;
			ctx.fillRect(startX - 2, startY - textHeight, textWidth + textPad, textHeight + textPad);

			ctx.fillStyle = "#d70000";
			ctx.fillText(label, startX, startY - textPad);
		});
	}

	async detect(model: tf.GraphModel, webcamRef: WebcamRef, canvasRef: CanvasRef): Promise<void> {
		if (webcamRef.current?.video?.readyState === 4) {
			const tensor = this.getWebcamTensor(webcamRef);
			if (tensor) {
				const detections = await this.getDetections(model, tensor);
				const ctx = canvasRef.current?.getContext("2d");
				if (ctx) {
					this.drawDetections(
						ctx,
						detections,
						webcamRef.current.video.videoHeight,
						webcamRef.current.video.videoWidth,
					);
				}
				tensor.dispose();
			}
		}
		requestAnimationFrame(() => this.detect(model, webcamRef, canvasRef));
	}

	adjustCanvasSize(webcamRef: WebcamRef, canvasRef: CanvasRef): void {
		if (webcamRef.current?.video && canvasRef.current) {
			const video = webcamRef.current.video;
			const canvas = canvasRef.current;
			const aspectRatio = video.videoWidth / video.videoHeight;
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const maxWidth = window.innerWidth * 0.9;
			const maxHeight = window.innerHeight * 0.9;

			if (video.videoWidth > maxWidth || video.videoHeight > maxHeight) {
				if (maxWidth / aspectRatio <= maxHeight) {
					canvas.style.width = `${maxWidth}px`;
					canvas.style.height = `${maxWidth / aspectRatio}px`;
				} else {
					canvas.style.width = `${maxHeight * aspectRatio}px`;
					canvas.style.height = `${maxHeight}px`;
				}
			} else {
				canvas.style.width = `${video.videoWidth}px`;
				canvas.style.height = `${video.videoHeight}px`;
			}
		}
	}

	async run(webcamRef: WebcamRef, canvasRef: CanvasRef): Promise<void> {
		try {
			const model = await this.loadModel();
			if (model) {
				this.adjustCanvasSize(webcamRef, canvasRef);
				window.addEventListener("resize", () => this.adjustCanvasSize(webcamRef, canvasRef));
				this.detect(model, webcamRef, canvasRef);
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
}
