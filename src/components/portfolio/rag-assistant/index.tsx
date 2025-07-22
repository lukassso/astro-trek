import type React from "react";
import { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageIcon, SlidersHorizontal, ArrowUp } from "lucide-react";
import AutoResizeTextarea from "./auto-resize-text-area";
import ImageUploadArea from "./image-upload-area";
import { cn } from "@/utils/shadcn";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useImageUpload } from "./use-image-upload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SupabaseComponent from "./supabase.component";
import TitanicChat from "./titanic-chat";

interface FormProps {
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onOpenOptions: () => void;
}

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  images: z.array(z.instanceof(File)).max(5, "Max 5 images"),
});

export default function Form({ isLoading, onSubmit, onOpenOptions }: FormProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "", images: [] },
  });
  const {
    images,
    addImages,
    removeImage,
    error,
    dragCounter,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useImageUpload();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isDragging = dragCounter.current > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
  };

  const handleDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
    handleDrop(files);
  };

  return (
    <>
      <FormProvider {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <div
            className={cn(
              "relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.12)] bg-black/60 shadow-lg backdrop-blur-md transition-all",
              isDragging ? "ring-2 ring-white" : isFocused ? "ring-2 ring-white" : "",
              isLoading && "animate-pulse-loading pointer-events-none opacity-70",
            )}
            onDragEnter={(e) => {
              e.preventDefault();
              handleDragEnter();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              handleDragLeave();
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={handleDropEvent}
          >
            <ImageUploadArea
              previewUrls={images.map((img) => img.previewUrl)}
              onRemoveImage={removeImage}
              isLoading={isLoading}
            />

            <div className="px-2 py-1.5">
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onOpenOptions}
                  disabled={isLoading}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
                <AutoResizeTextarea
                  placeholder="Generate 3D model..."
                  className="flex-1 resize-none border-0 bg-transparent px-3 py-2 text-base tracking-normal text-white placeholder:text-gray-400 focus:ring-0"
                  {...form.register("prompt")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isMobile && !e.shiftKey) {
                      e.preventDefault();
                      formRef.current?.requestSubmit();
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0 text-black hover:bg-gray-200"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {isDragging && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/80">
                <p className="text-lg font-medium tracking-normal text-white">Drop images here</p>
              </div>
            )}
          </div>
          {error && <div className="mt-2 text-sm tracking-normal text-red-400">{error}</div>}
        </form>
      </FormProvider>
      <TitanicChat />
    </>
  );
}
