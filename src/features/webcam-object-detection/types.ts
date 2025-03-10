export interface WebcamRef {
  current: {
    video: HTMLVideoElement | null;
  } | null;
}

export interface CanvasRef {
  current: HTMLCanvasElement | null;
}

export interface Detections {
  chosen: Int32Array;
  maxIndices: Int32Array;
  scores: number[];
  boxes: number[][];
}
