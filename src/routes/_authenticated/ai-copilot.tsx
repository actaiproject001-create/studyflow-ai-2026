import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { AiAssistantPanel } from "@/components/ai-assistant-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { createAssignment, deleteAssignment, fetchAssignments } from "@/services/study-service";
import { dueLabel } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/ai-copilot")({
  head: () => ({
    meta: [
      { title: "AI Assignment Copilot — StudyFlow AI" },
      { name: "description", content: "Break down assignments into simple, doable steps with your AI copilot." },
      { property: "og:title", content: "AI Assignment Copilot — StudyFlow AI" },
      { property: "og:description", content: "Your always-on assignment sidekick." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CopilotPage,
});

function CopilotPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments", user?.id],
    queryFn: () => fetchAssignments(user!.id),
    enabled: !!user?.id,
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["assignments", user?.id] });
    void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const create = useMutation({
    mutationFn: () =>
      createAssignment({
        user_id: user!.id,
        title: title.trim(),
        subject: subject.trim() || null,
        due_date: dueDate || null,
      }),
    onSuccess: () => {
      setTitle("");
      setSubject("");
      setDueDate("");
      invalidate();
    },
  });

  const remove = useMutation({ mutationFn: deleteAssignment, onSuccess: invalidate });

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !user) return;
    create.mutate();
  }

  return (
    <AppLayout
      title="AI Assignment Copilot"
      description="Understand assignments, generate roadmaps, and turn overwhelm into a plan."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <form onSubmit={handleAdd} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold">Add an assignment</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Assignment title"
                required
              />
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                aria-label="Subject"
              />
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                aria-label="Due date"
              />
            </div>
            <Button
              type="submit"
              disabled={create.isPending}
              className="mt-4 bg-gradient-primary text-white shadow-glow hover:opacity-95"
            >
              {create.isPending ? "Adding..." : "Add assignment"}
            </Button>
          </form>

          {!isLoading && assignments.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No assignments yet"
              description="Add your first assignment above, then ask the copilot to break it into steps."
            />
          ) : (
            <div className="space-y-3">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {[a.subject, dueLabel(a.due_date)].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <button
                    onClick={() => remove.mutate(a.id)}
                    aria-label={`Delete ${a.title}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="bg-gradient-primary px-4 py-3 text-sm font-semibold text-white">
              Assignment Copilot
            </div>
            <AiAssistantPanel
              tool="assignment_copilot"
              placeholder="Paste your assignment brief..."
              context={
                assignments.length
                  ? `My current assignments: ${assignments
                      .map((a) => `${a.title}${a.due_date ? ` (due ${a.due_date})` : ""}`)
                      .join("; ")}`
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
