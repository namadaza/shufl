import { GenerateImages } from "@/components/organisms/GenerateImages";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { gradientStyles, textGradientSupporStyles } from "@/lib/styleUtils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-full min-h-screen flex flex-col bg-neutral-950 text-white items-center justify-start pb-32 px-4">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex items-center justify-center flex-row w-full pt-24">
          <div className={cn("h-16 w-16 rounded-full p-1", gradientStyles)}>
            <Image
              alt=""
              src="/logo.png"
              width={50}
              height={50}
              className={cn("rounded-full h-full w-full")}
            />
          </div>
          <div
            className={cn(
              "text-3xl font-bold pl-4",
              gradientStyles,
              textGradientSupporStyles,
            )}
          >
            SHUFL
          </div>
        </div>
        <div className="pt-4 text-sm">
          Made by{" "}
          <Link
            className="underline"
            href="https://amanazad.xyz"
            target="_blank"
          >
            Aman Azad
          </Link>
        </div>

        {/* H1 */}
        <div className="flex items-center justify-center flex-col w-full pt-24">
          <div
            className={cn(
              "text-4xl lg:text-6xl font-bold w-full text-center",
              gradientStyles,
              textGradientSupporStyles,
            )}
          >
            Your text-based image content
            <br />
            <span className="text-white">automatically</span> created from APIs
          </div>
        </div>

        {/* Generate Images */}
        <GenerateImages />
      </div>
    </div>
  );
}
