import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, Check, Clock3, RotateCw, Sparkles } from "lucide-react";
import { AppShell } from "@/components/learnwise/app-shell";
import { DemoLabel, PageHeading, SectionTitle, Surface } from "@/components/learnwise/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { prioritizedStudyTasks, studyTasks } from "@/lib/learnwise-data";

const STORAGE_KEY = "learnwise-study-completed-v1";
const validTaskIds = new Set(studyTasks.map((task) => task.id));

export const Route = createFileRoute("/study-plan")({
  head: () => ({ meta: [
    { title: "Study Plan | LearnWise AI" },
    { name: "description", content: "View and track a sample rule-based daily study plan personalized to the demo topic scores." },
    { property: "og:title", content: "Study Plan | LearnWise AI" },
    { property: "og:description", content: "A transparent sample study plan prioritized by topic scores." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: StudyPlanPage,
});

function readSavedTasks() {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string" && validTaskIds.has(id));
  } catch {
    return [];
  }
}

function StudyPlanPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const tasks = useMemo(() => prioritizedStudyTasks(), [generated]);
  useEffect(() => setCompleted(readSavedTasks()), []);

  function toggleTask(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep task completion available for this session. */ }
      return next;
    });
  }

  const doneCount = tasks.filter((task) => completed.includes(task.id)).length;
  const completion = Math.round((doneCount / tasks.length) * 100);

  return <AppShell>
    <PageHeading eyebrow="A focused day" title="Your study plan" description="A practical, topic-led plan based on the sample scores in your demo profile." action={<DemoLabel />} />
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
      <div className="flex items-center gap-3"><CalendarCheck2 className="size-5 text-primary" /><div><p className="text-sm font-semibold">Today’s focus</p><p className="text-xs text-muted-foreground">60 minutes · 3 short sessions</p></div></div>
      <Button variant="outline" onClick={() => setGenerated((value) => !value)}><RotateCw className="size-4" /> Generate Demo Study Plan</Button>
    </div>
    <Surface className="mb-7 p-5">
      <div className="mb-3 flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">Your daily progress</p><p className="mt-1 text-xs text-muted-foreground">{doneCount} of {tasks.length} sessions complete</p></div><span className="font-display text-xl font-bold text-primary">{completion}%</span></div>
      <Progress value={completion} className="h-2.5 bg-muted [&>div]:bg-primary" />
    </Surface>
    <SectionTitle title="Recommended sessions" detail="Prioritized from lower to higher sample topic scores." />
    <div className="space-y-3">{tasks.map((task, index) => {
      const isDone = completed.includes(task.id);
      return <Surface key={task.id} className={`flex flex-wrap items-center gap-4 p-4 sm:p-5 ${isDone ? "opacity-75" : ""}`}>
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isDone ? "bg-success/15 text-success-foreground" : "bg-primary/10 text-primary"}`}>{isDone ? <Check className="size-5" /> : `0${index + 1}`}</div>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className={`text-sm font-semibold ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</h3><Badge variant={task.priority === "High" ? "warning" : task.priority === "Medium" ? "info" : "success"}>{task.priority} priority</Badge></div><p className="mt-1 text-xs text-muted-foreground">{task.detail}</p><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Sparkles className="size-3.5 text-primary" />{task.reason}</p></div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end"><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{task.duration} min</span><Button variant={isDone ? "outline" : "default"} size="sm" onClick={() => toggleTask(task.id)}>{isDone ? "Undo" : "Mark complete"}</Button></div>
      </Surface>;
    })}</div>
    <p className="mt-5 text-xs leading-5 text-muted-foreground">Demo rule: sessions are ordered by sample topic score, with lower-scoring subjects first. This is a transparent prototype rule, not a trained AI model.</p>
    <div className="mt-6 border-t border-border pt-5"><Button asChild variant="ghost"><Link to="/insights">See why these topics were chosen <ArrowRight /></Link></Button></div>
  </AppShell>;
}