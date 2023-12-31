import { ApiTextGenerator } from "@/lib/types";
import { truncateQuote } from "@/lib/utils";

const API_URL = "https://api.themotivate365.com/stoic-quote";

type StoicQuoteAPIResponse = {
  author: string;
  quote: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const response = await fetch(API_URL);
  const data = (await response.json()) as StoicQuoteAPIResponse;

  const formattedData: ApiTextGenerator = {
    title: truncateQuote(data.quote),
    subtitle: data.author,
  };

  return new Response(JSON.stringify(formattedData), {
    headers: { "content-type": "application/json" },
  });
}
