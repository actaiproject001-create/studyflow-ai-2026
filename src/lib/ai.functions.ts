import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { AI_MODELS, createLovableAiGatewayProvider, getLovableApiKey } from "@/lib/ai-gateway.server";
import { SYSTEM_PROMPTS, type AiToolKey } from "@/lib/ai-prompts";

const AskInput = z.object({
  tool: z.enum(["assignment_copilot", "research_assistant", "study_planner", "second_brain"]),
  prompt: z.string().trim().min(1).max(8000),
  context: z.string().trim().max(8000).optional(),
});

export const askAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AskInput.parse(input))
  .handler(async ({ data, context }) => {
    const gateway = createLovableAiGatewayProvider(getLovableApiKey());

    try {
      const result = await generateText({
        model: gateway(AI_MODELS.fast),
        system: SYSTEM_PROMPTS[data.tool as AiToolKey],
        prompt: data.context ? `${data.context}\n\n---\n\n${data.prompt}` : data.prompt,
      });

      await context.supabase.from("ai_history").insert({
        user_id: context.userId,
        tool: data.tool,
        prompt: data.prompt,
        response: result.text,
        model: AI_MODELS.fast,
        tokens_used: result.usage?.totalTokens ?? null,
      });

      return { text: result.text };
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI request failed";
      if (message.includes("429")) throw new Error("AI is busy right now — please try again in a moment.");
      if (message.includes("402")) throw new Error("AI credits are exhausted. Please add credits to continue.");
      throw new Error(message);
    }
  });
