"use client";

import { AspectRatioChoice, FontChoice } from "@/lib/types";
import { cn } from "@/lib/utils";

export const CustomImagePreview: React.FC<{
  imageSrc: string;
  aspectRatio: AspectRatioChoice;
  fontChoice: FontChoice;
  title: string;
  subtitle: string;
}> = ({ imageSrc, aspectRatio, fontChoice, title, subtitle }) => {
  const finalImage = imageSrc || "/checkerboard.png";
  return (
    <div
      className={cn("w-full flex flex-col justify-center items-start relative")}
    >
      <img
        alt=""
        src={finalImage}
        className={cn(
          "w-full rounded-md object-cover absolute top-0 left-0 z-10",
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
  );
};
