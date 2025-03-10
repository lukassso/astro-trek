import { ViewIcon } from "lucide-react";
import { Card } from "@/components/ui/card-spring";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { useRef, useEffect } from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  playbackRate?: number;
}

const CustomVideo: React.FC<VideoProps> = ({ playbackRate = 1, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return <video ref={videoRef} {...props} />;
};

export default function GreetingsSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="relative w-full">
        <CustomVideo
          autoPlay
          muted
          loop
          playsInline
          playbackRate={0.5}
          className="-mt-40 h-auto w-full rounded-t-xl object-cover"
        >
          <source src="/assets/videos/greetings-video.mp4" type="video/mp4" />
        </CustomVideo>
        <div className="w-full rounded-b-xl bg-white p-6 dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 animate-pulse rounded-full bg-gradient-to-br from-green-300 to-green-500 p-2">
              <ViewIcon className="h-8 w-8 text-white" />
            </div>
            <div className="">
              <p className="text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                Keep an eye on this space for updates on the latest trends in web technology. <br />
                I am constantly learning and adapting, committed to enhancing my skills and
                embracing industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full rounded-2xl bg-gradient-to-b from-[#f8f8f8] to-[#f0f0f0] py-6 dark:from-gray-950 dark:to-gray-700 sm:-mt-40 md:-mt-60">
      <div className="container flex flex-col items-center px-4 text-center md:px-6">
        <div className="relative w-full">
          <CustomVideo
            autoPlay
            muted
            loop
            playsInline
            playbackRate={0.5}
            className="w-full rounded-2xl object-cover"
          >
            <source src="/assets/videos/greetings-video.mp4" type="video/mp4" />
          </CustomVideo>
          <div>
            <div className="absolute bottom-2 left-2 mr-2 rounded-2xl bg-white p-6 dark:bg-gray-950">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 animate-pulse rounded-full bg-gradient-to-br from-green-300 to-green-500 p-2">
                  <ViewIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Keep an eye on this space for updates on the latest trends in web technology.
                    <br />I am constantly learning and adapting, committed to enhancing my skills
                    and embracing industry best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
