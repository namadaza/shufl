import { z } from "zod";

export type FontChoice = "inter" | "crimson" | "caveat";

export type AspectRatioChoice = "socialStory" | "socialPost";

export const ApiTextGeneratorSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});
export type ApiTextGenerator = z.infer<typeof ApiTextGeneratorSchema>;
