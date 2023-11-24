import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

interface DropzoneProps {
  onFileChange: (file: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileChange(file);
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn("dropZone", isDragActive && "active")}
    >
      <div className="w-full text-left text-md mb-4 mt-2 bg-white bg-opacity-10 rounded-xl px-6 py-4 flex flex-col cursor-pointer">
        <div>
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        <div className="flex flex-row justify-center items-center w-full pt-4">
          <ImagePlus size={24} />
        </div>
      </div>
    </div>
  );
};
