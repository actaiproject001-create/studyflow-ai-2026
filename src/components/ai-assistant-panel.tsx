import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Send, Loader2 } from "lucide-react";
import { askAi } from "@/lib/ai.functions";
import type { AiTool } from "@/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiAssistantPanel({
  tool,
  placeholder = "Ask StudyFlow AI...",
  context,
}: {
  tool: AiTool;
  placeholder?: string;
  context?: string;
}) {
  const ask = useServerFn(askAi);
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (prompt: string) => ask({ data: { tool, prompt, context } }),
    onSuccess: (result) => {
      setMessages((m) => [...m, { role: "assistant", content: result.text }]);
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err: unknown) => {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || mutation.isPending) return;
    setError(null);
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setInput("");
    mutation.mutate(prompt);
  }

  return (
    <div className="flex flex-col">
      <div className="max-h-80 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="rounded-xl bg-secondary p-3 text-sm text-muted-foreground">
            Hi! Ask me about your assignments, research or study plan.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-xl bg-gradient-primary px-3 py-2 text-sm text-white"
                : "w-fit max-w-[95%] whitespace-pre-wrap rounded-xl bg-secondary px-3 py-2 text-sm text-foreground"
            }
          >
            {m.content}
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
          </div>
        )}
        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          aria-label="Send message"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-white disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
