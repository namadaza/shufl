import { ApiTextGenerator } from "@/lib/types";
import { truncateQuote } from "@/lib/utils";

const API_URL = "https://api.kanye.rest/";

type KanyeQuoteAPIResponse = {
  quote: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const response = await fetch(API_URL);
  const data = (await response.json()) as KanyeQuoteAPIResponse;

  const formattedData: ApiTextGenerator = {
    title: truncateQuote(data.quote),
    subtitle: "Kanye West",
  };

  return new Response(JSON.stringify(formattedData), {
    headers: { "content-type": "application/json" },
  });
}
