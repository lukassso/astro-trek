import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera: React.FC = () => {
	const webcamRef = useRef<Webcam>(null);
	const [url, setUrl] = React.useState<string | null>(null);

	const capturePhoto = React.useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			setUrl(imageSrc);
		}
	}, [webcamRef]);

	const onUserMedia = (e: any) => {
		console.log(e);
	};

	return (
		<div className="flex min-h-screen flex-col items-center">
			<div className="relative rounded-xl border-2 border-gray-300 p-4">
				<Webcam
					ref={webcamRef}
					audio={false}
					screenshotFormat="image/jpeg"
					videoConstraints={videoConstraints}
					onUserMedia={onUserMedia}
					className="rounded-xl"
				/>
			</div>
			<div className="mt-4 flex flex-col items-center">
				<button onClick={capturePhoto} className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white">
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
