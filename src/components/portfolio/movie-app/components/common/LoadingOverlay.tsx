import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Loader2 className="h-24 w-24 animate-spin" />
    </div>
  );
};

export default LoadingOverlay;
