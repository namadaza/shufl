import { ApiTextGenerator } from "@/lib/types";
import { truncateQuote } from "@/lib/utils";

const API_URL = "https://www.affirmations.dev/";

type AffirmationsAPIResponse = {
  affirmation: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const response = await fetch(API_URL);
  const data = (await response.json()) as AffirmationsAPIResponse;

  const formattedData: ApiTextGenerator = {
    title: truncateQuote(data.affirmation),
    subtitle: "Daily Affirmation",
  };

  return new Response(JSON.stringify(formattedData), {
    headers: { "content-type": "application/json" },
  });
}
