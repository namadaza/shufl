"use client";
import React, { useState } from "react";
import { SectionTitle } from "../section-title";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Dices } from "lucide-react";
import { Input } from "../ui/input";

type FontChoice = "inter" | "crimson" | "caveat";

export const GenerateImages = () => {
  const [aspectRatio, setAspectRatio] = useState<"socialStory" | "socialPost">(
    "socialPost",
  );

  const fonts: FontChoice[] = ["inter", "crimson", "caveat"];
  const [fontChoice, setFontChoice] = useState<FontChoice>("inter");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);
  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
    setPreviewImageIndex(imageUrls.length - 1);
  };
  const removeImageUrl = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setPreviewImageIndex(0);
  };
  const updateImageUrl = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
    setPreviewImageIndex(index);
  };
  const setRandomImageIndex = () => {
    setPreviewImageIndex(Math.floor(Math.random() * imageUrls.length));
  };

  console.log("CONFIG", aspectRatio, fontChoice);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-36 max-w-3xl">
      {/* Aspect Ratio */}
      <SectionTitle index={1} title="Setup" />
      <div className="text-xl flex flex-col items-center justify-center w-full pt-8 font-bold">
        Aspect Ratio
      </div>
      <div className="flex flex-row items-start gap-x-8 justify-center w-full pt-8">
        {/* 3:4 */}
        <div className="flex flex-1 items-start justify-end">
          <div
            className={cn(
              "bg-white rounded-sm aspect-socialPost w-3/4",
              "text-black text-7xl h-full flex items-center justify-center",
              "font-bold",
              "transition-all duration-100 ease-in hover:border-2 hover:border-red-600 cursor-pointer",
              aspectRatio === "socialPost"
                ? "border-2 border-red-600"
                : "border-2 border-transparent",
            )}
            onClick={() => setAspectRatio("socialPost")}
          >
            4:3
          </div>
        </div>

        {/* 9:16 */}
        <div className="flex flex-1 items-start justify-start">
          <div
            className={cn(
              "bg-white rounded-sm aspect-socialStory w-3/4 text-black text-7xl h-full",
              "flex items-center justify-center font-bold",
              "transition-all duration-100 ease-in hover:border-2 hover:border-red-600 cursor-pointer",
              aspectRatio === "socialStory"
                ? "border-2 border-red-600"
                : "border-2 border-transparent",
            )}
            onClick={() => setAspectRatio("socialStory")}
          >
            9:16
          </div>
        </div>
      </div>

      {/* Font Choice */}
      <div className="text-xl flex flex-col items-center justify-center w-full pt-12 font-bold">
        Fonts
      </div>
      <div className="flex flex-row items-start gap-x-8 justify-center w-full pt-8">
        {fonts.map((font) => (
          <div key={font} className="flex flex-1 items-start justify-center">
            <div
              className={cn(
                font === "inter" && "font-inter",
                font === "crimson" && "font-crimson",
                font === "caveat" && "font-caveat",
                "w-full h-24 bg-white rounded-sm aspect-socialStory text-black",
                "flex flex-col items-center justify-center font-bold",
                "transition-all duration-100 ease-in hover:border-2 hover:border-red-600 cursor-pointer",
                fontChoice === font
                  ? "border-2 border-red-600"
                  : "border-2 border-transparent",
              )}
              onClick={() => setFontChoice(font)}
            >
              <div className="capitalize text-2xl font-bold">{font}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="pt-24" />
      <SectionTitle index={2} title="Content" />
      <div className="text-xl flex flex-col items-center justify-center w-full pt-8 font-bold">
        Image Backgrounds
      </div>
      <div className="flex flex-row items-start justify-center w-full pt-8 gap-x-8">
        {/* Image Background Input */}
        <div className="flex flex-1 items-start justify-center flex-col">
          <div className="w-full text-left text-lg pb-4">Image URLs</div>
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center py-2 w-full"
            >
              <Input
                onChange={(e) => updateImageUrl(index, e?.target?.value)}
                placeholder="https://..."
                type="text"
                value={imageUrl}
                className="text-black"
              />
              <Button
                className="ml-2"
                variant="ghost"
                onClick={() => removeImageUrl(index)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <div className="pt-2 flex w-full justify-start">
            <Button variant="secondary" onClick={addImageUrl}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Image URL
            </Button>
          </div>
        </div>

        {/* Image Background Preview */}
        <div className="flex flex-col flex-1 items-start justify-center">
          <div className="w-full text-left text-lg pb-4">Preview</div>
          <div
            className={cn(
              "w-full flex flex-col justify-center items-start relative",
            )}
          >
            <img
              alt=""
              src={imageUrls[previewImageIndex] || "/checkerboard.png"}
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
                "text-4xl text-black font-bold text-center",
                "shadow-2xl",
                fontChoice === "inter" && "font-inter",
                fontChoice === "crimson" && "font-crimson",
                fontChoice === "caveat" && "font-caveat",
                aspectRatio === "socialStory"
                  ? "aspect-socialStory"
                  : "aspect-socialPost",
              )}
              style={{
                WebkitTextStroke: "2px white",
              }}
            >
              <div>Lorem ipsum...</div>
              <div
                className="text-xl text-black pt-4"
                style={{
                  WebkitTextStroke: "1px white",
                }}
              >
                - dolor Sit Amet
              </div>
            </div>
          </div>
          <div className="pt-4 w-full">
            <Button variant="secondary" onClick={setRandomImageIndex}>
              <Dices className="mr-2 h-4 w-4" /> Shuffle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
