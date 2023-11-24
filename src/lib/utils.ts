import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateQuote = (quote: string) => {
  let truncatedQuote;
  const splitQuote = quote.split(" ");
  if (splitQuote.length > 25) {
    truncatedQuote = splitQuote.slice(0, 25).join(" ") + "...";
  } else {
    truncatedQuote = quote;
  }

  return truncatedQuote;
};
