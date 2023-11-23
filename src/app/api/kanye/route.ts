import { ApiTextGenerator } from "@/lib/types";

const API_URL = "https://api.kanye.rest/";

type KanyeQuoteAPIResponse = {
  quote: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const response = await fetch(API_URL);
  const data = (await response.json()) as KanyeQuoteAPIResponse;

  // Truncate incoming quote to 25 words, add ellipsis if truncated
  let truncatedQuote;
  const splitQuote = data.quote.split(" ");
  if (splitQuote.length > 25) {
    truncatedQuote = splitQuote.slice(0, 25).join(" ") + "...";
  } else {
    truncatedQuote = data.quote;
  }

  const formattedData: ApiTextGenerator = {
    title: truncatedQuote,
    subtitle: "Kanye West",
  };

  return new Response(JSON.stringify(formattedData), {
    headers: { "content-type": "application/json" },
  });
}
