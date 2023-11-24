import type { Metadata } from "next";
import { Inter, Crimson_Text, Caveat, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: "400",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "700"],
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Shufl",
  icons: ["/favicon.ico"],
  description: "Your text-based image content automatically created from APIs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          inter.variable,
          crimson.variable,
          caveat.variable,
          ubuntuMono.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
