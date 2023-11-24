"use client";

import { AspectRatioChoice, FontChoice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

export type CustomImagePreviewProps = {
  imageSrc: string;
  aspectRatio: AspectRatioChoice;
  fontChoice: FontChoice;
  title: string;
  subtitle: string;
};

export const CustomImagePreview: React.FC<CustomImagePreviewProps> = ({
  imageSrc,
  aspectRatio,
  fontChoice,
  title,
  subtitle,
}) => {
  const randomId = Math.random().toString(36).substring(7);
  const ref = useRef<HTMLDivElement>(null);

  const finalImage = imageSrc || "/checkerboard.png";

  const onDownload = () => {
    if (ref?.current) {
      html2canvas(ref.current, {
        useCORS: true,
        allowTaint: false,
      }).then((canvas) => {
        const imageUrl = canvas.toDataURL(); // Convert canvas to data URL
        // Create a download link
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `shufl_img_${randomId}.png`;
        link.click();
      });
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col justify-center items-start relative",
        )}
      >
        <img
          alt=""
          src={finalImage}
          className={cn(
            "w-full object-cover absolute top-0 left-0 z-10 opacity-80",
            aspectRatio === "socialStory"
              ? "aspect-socialStory"
              : "aspect-socialPost",
          )}
        />
        <div
          className={cn(
            "w-full rounded-md flex flex-col justify-center items-center z-20",
            "text-2xl text-white font-bold text-center",
            "drop-shadow-lg p-4",
            fontChoice === "inter" && "font-inter",
            fontChoice === "crimson" && "font-crimson",
            fontChoice === "caveat" && "font-caveat",
            aspectRatio === "socialStory"
              ? "aspect-socialStory"
              : "aspect-socialPost",
          )}
          style={{
            WebkitTextStroke: "0.5px black",
          }}
        >
          <div>{title}</div>
          <div
            className="text-lg text-white pt-4 drop-shadow-xl"
            style={{
              WebkitTextStroke: "0.5px black",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full pt-4">
        <Button onClick={onDownload}>Download</Button>
      </div>
    </>
  );
};
