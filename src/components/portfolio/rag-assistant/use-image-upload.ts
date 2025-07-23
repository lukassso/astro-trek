import { useState, useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";

interface UseImageUploadOptions {
  maxImages?: number;
}

export function useImageUpload({ maxImages = 5 }: UseImageUploadOptions = {}) {
  const [images, setImages] = useState<{ file: File; previewUrl: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dragCounter = useRef(0);
  const form = useFormContext();

  const addImages = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const totalImages = images.length + files.length;
      let newFiles = files;

      if (totalImages > maxImages) {
        setError(`You can upload a maximum of ${maxImages} images`);
        const allowedNewImages = maxImages - images.length;
        newFiles = files.slice(0, allowedNewImages);
        if (newFiles.length === 0) return;
      } else {
        setError(null);
      }

      const newImageItems = newFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      const updatedImages = [...images, ...newImageItems];

      setImages(updatedImages);
      form.setValue(
        "images",
        updatedImages.map((img) => img.file),
      );
    },
    [images, form, maxImages],
  );

  const removeImage = useCallback(
    (index: number) => {
      const updatedImages = [...images];
      const [removed] = updatedImages.splice(index, 1);
      URL.revokeObjectURL(removed.previewUrl);
      setImages(updatedImages);
      form.setValue(
        "images",
        updatedImages.map((img) => img.file),
      );
    },
    [images, form],
  );

  const handleDragEnter = () => {
    dragCounter.current += 1;
  };

  const handleDragLeave = () => {
    dragCounter.current -= 1;
  };

  const handleDrop = (files: File[]) => {
    dragCounter.current = 0;
    addImages(files);
  };

  return {
    images,
    addImages,
    removeImage,
    error,
    dragCounter,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
}
