import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Loader className="mx-auto animate-spin text-blue-500" size={48} />
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
