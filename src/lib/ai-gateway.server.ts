import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayProvider(lovableApiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export function getLovableApiKey() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured yet.");
  return key;
}

export const AI_MODELS = {
  fast: "google/gemini-3.5-flash",
  reasoning: "google/gemini-3.1-pro-preview",
} as const;

export { LOVABLE_AIG_RUN_ID_HEADER };
