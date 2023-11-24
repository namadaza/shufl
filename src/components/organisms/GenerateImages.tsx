"use client";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../section-title";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PackagePlus, Loader2, PlusCircle, Trash2, Dices } from "lucide-react";
import { Input } from "../ui/input";
import { FontChoice, AspectRatioChoice, ApiTextGenerator } from "@/lib/types";
import {
  CustomImagePreview,
  CustomImagePreviewProps,
} from "./CustomImagePreview";

const apiUrlOptions = [
  {
    name: "Affirmations",
    url: "/api/affirmations",
  },
  {
    name: "Stoic Sayings",
    url: "/api/stoic",
  },
  {
    name: "Kanye Quotes",
    url: "/api/kanye",
  },
];

export const GenerateImages = () => {
  const [aspectRatio, setAspectRatio] =
    useState<AspectRatioChoice>("socialPost");

  const fonts: FontChoice[] = ["inter", "crimson", "caveat"];
  const [fontChoice, setFontChoice] = useState<FontChoice>("inter");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);

  const [selectedApi, setSelectedApi] = useState<string>("/api/stoic");
  const [previewText, setPreviewText] = useState<ApiTextGenerator>({
    title: "Lorem ipsum...",
    subtitle: "dolor Sit Amet",
  });

  const [shufflingPreview, setShufflingPreview] = useState<boolean>(false);

  const [generatedImageConfigs, setGeneratedImageConfigs] = useState<
    CustomImagePreviewProps[]
  >([]);
  const [generatingImageConfigs, setGeneratingImageConfigs] =
    useState<boolean>(false);

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

  const shufflePreview = async () => {
    setShufflingPreview(true);
    if (selectedApi) {
      const response = await fetch(selectedApi);
      const data = (await response.json()) as ApiTextGenerator;
      setPreviewText(data);
    }
    setRandomImageIndex();
    setShufflingPreview(false);
  };

  const changeSelectedApi = (url: string) => {
    if (url === selectedApi) {
      return;
    }
    setSelectedApi(url);
  };

  const onGenerateImages = async () => {
    // Create 5 config objects for the images, append to the array
    setGeneratingImageConfigs(true);
    const newGeneratedImageConfigs: CustomImagePreviewProps[] = [];
    for (let i = 0; i < 5; i++) {
      const response = await fetch(selectedApi);
      const data = (await response.json()) as ApiTextGenerator;
      newGeneratedImageConfigs.push({
        title: data.title,
        subtitle: data.subtitle,
        aspectRatio,
        fontChoice,
        imageSrc: imageUrls[Math.floor(Math.random() * imageUrls.length)],
      });
    }
    setGeneratedImageConfigs((prev) => [...newGeneratedImageConfigs, ...prev]);
    setGeneratingImageConfigs(false);
  };

  useEffect(() => {
    shufflePreview();
  }, [selectedApi]);

  return (
    <div className="flex min-w-fit flex-col items-center justify-center w-full pt-36 max-w-3xl">
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
              "bg-white rounded-sm aspect-socialPost w-1/2",
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
              "bg-white rounded-sm aspect-socialStory w-1/2 text-black text-7xl h-full",
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
      <div className="flex flex-row items-start justify-center w-full pt-8 gap-x-8">
        <div className="flex flex-1 items-start justify-center flex-col">
          {/* Image Background Input */}
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

          {/* Text Content API Input */}
          <div className="w-full text-left text-lg pb-4 pt-8">Image Text</div>
          <div className="w-full text-left italic text-md pb-4 pt-2">
            Select a pre-configured API...
          </div>
          {apiUrlOptions.map((apiOption) => (
            <div
              key={apiOption.name}
              className="flex flex-1 items-start justify-center w-full py-2"
            >
              <div
                className={cn(
                  "w-full h-12 bg-white rounded-sm aspect-socialStory text-black",
                  "flex flex-col items-center justify-center font-bold",
                  "transition-all duration-100 ease-in hover:border-2 hover:border-red-600 cursor-pointer",
                  selectedApi === apiOption.url
                    ? "border-2 border-red-600"
                    : "border-2 border-transparent",
                )}
                onClick={() => changeSelectedApi(apiOption.url)}
              >
                <div className="capitalize text-lg font-normal">
                  {apiOption.name}
                </div>
              </div>
            </div>
          ))}
          <div className="w-full text-left italic text-md pt-4">
            ...or enter your own API URL
          </div>
          <div className="w-full text-left italic text-md pt-2">
            Note: API must return JSON in the following format:
          </div>
          <div className="w-full text-left text-md mb-4 mt-2 bg-white bg-opacity-10 rounded-xl px-6 py-4">
            <p>{`{`}</p>
            <p className="pl-4">{`"title": "Lorem ipsum...",`}</p>
            <p className="pl-4">{`"subtitle": "dolor Sit Amet",`}</p>
            <p>{`}`}</p>
          </div>
          <div className="pt-2 flex w-full justify-start">
            <Input
              onChange={(e) => setSelectedApi(e?.target?.value)}
              placeholder="https://..."
              type="text"
              value={selectedApi}
              className="text-black"
            />
          </div>
        </div>

        {/* Image Background Preview */}
        <div className="flex flex-col flex-1 items-start justify-center">
          <div className="w-full text-left text-lg pb-4">Preview</div>
          <CustomImagePreview
            title={previewText.title || "Lorem ipsum..."}
            subtitle={previewText.subtitle || "dolor Sit Amet"}
            aspectRatio={aspectRatio}
            fontChoice={fontChoice}
            imageSrc={imageUrls[previewImageIndex]}
          />
          <div className="pt-4 w-full">
            <Button variant="secondary" onClick={shufflePreview}>
              {shufflingPreview ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Dices className="mr-2 h-4 w-4" />
              )}{" "}
              Shuffle
            </Button>
          </div>
        </div>
      </div>

      {/* Generate Images */}
      <div className="pt-24" />
      <SectionTitle index={3} title="Generate Images" />
      <div className="flex flex-row items-start justify-center w-full pt-8 gap-x-8">
        <div className="flex flex-1 items-start justify-center flex-col">
          <Button
            variant="secondary"
            onClick={onGenerateImages}
            disabled={generatingImageConfigs}
          >
            {generatingImageConfigs ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PackagePlus className="mr-2 h-4 w-4" />
            )}{" "}
            Generate Images (5)
          </Button>
        </div>
      </div>
      {generatedImageConfigs.length > 0 && (
        <div className="flex flex-row items-start justify-start w-full pt-8 gap-8">
          {generatedImageConfigs.map((config, index) => (
            <div
              key={index}
              className="flex w-72  items-start justify-center flex-col"
            >
              <CustomImagePreview {...config} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
