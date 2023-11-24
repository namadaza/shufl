"use client";

import { AspectRatioChoice, FontChoice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  const randomId = `shufl_${Math.random().toString(36).substring(7)}`;
  const ref = useRef<HTMLDivElement>(null);

  const finalImage = imageSrc || "/checkerboard.png";

  let width;
  let height;
  switch (aspectRatio) {
    case "socialStory":
      width = 300;
      height = 168;
      break;
    case "socialPost":
      width = 300;
      height = 400;
      break;
  }

  const onDownload = () => {
    if (ref?.current) {
      html2canvas(document.querySelector(`#${randomId}`) ?? ref.current, {
        useCORS: true,
        allowTaint: false,
      }).then((canvas) => {
        const imageUrl = canvas.toDataURL(); // Convert canvas to data URL
        // Create a download link
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `${randomId}.png`;
        link.click();
      });
    }
  };

  return (
    <>
      <div
        ref={ref}
        id={randomId}
        className={cn(
          "w-full flex flex-col justify-center items-start relative overflow-hidden",
          "max-w-[280px] lg:max-w-[400px]",
          aspectRatio === "socialStory"
            ? "aspect-socialStory"
            : "aspect-socialPost",
        )}
      >
        <Image
          alt=""
          src={finalImage}
          className={cn("h-full w-full z-10", "relative max-w-none")}
          width={800}
          height={800}
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full",
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
        <Button className="w-full" onClick={onDownload}>
          Download
        </Button>
      </div>
    </>
  );
};
