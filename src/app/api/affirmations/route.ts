import { ApiTextGenerator } from "@/lib/types";

const API_URL = "https://www.affirmations.dev/";

type AffirmationsAPIResponse = {
  affirmation: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const response = await fetch(API_URL);
  const data = (await response.json()) as AffirmationsAPIResponse;

  // Truncate incoming quote to 25 words, add ellipsis if truncated
  let truncatedQuote;
  const splitQuote = data.affirmation.split(" ");
  if (splitQuote.length > 25) {
    truncatedQuote = splitQuote.slice(0, 25).join(" ") + "...";
  } else {
    truncatedQuote = data.affirmation;
  }

  const formattedData: ApiTextGenerator = {
    title: truncatedQuote,
    subtitle: "Daily Affirmation",
  };

  return new Response(JSON.stringify(formattedData), {
    headers: { "content-type": "application/json" },
  });
}
