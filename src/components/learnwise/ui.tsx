import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { topics, type LearningTopic, type TopicId } from "@/lib/learnwise-data";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
      </div>
      {action}
    </div>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card ${className}`}>{children}</section>;
}

export function DemoLabel() {
  return (
    <div className="inline-flex items-center gap-2 rounded-sm border border-demo/25 bg-demo-soft px-3 py-2 text-xs font-medium text-demo-foreground">
      <span className="size-1.5 rounded-full bg-demo" /> Sample data · Demo profile
    </div>
  );
}

export function ScoreBar({ score, showLabel = false }: { score: number; showLabel?: boolean }) {
  return (
    <div>
      {showLabel && <div className="mb-2 flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-semibold text-foreground">{score}%</span></div>}
      <Progress value={score} className="h-2 bg-muted [&>div]:bg-primary" />
    </div>
  );
}

export function ScorePill({ score }: { score: number }) {
  const variant = score < 65 ? "warning" : score < 80 ? "info" : "success";
  return <Badge variant={variant}>{score}%</Badge>;
}

export function TopicCard({ topic }: { topic: LearningTopic }) {
  return (
    <Surface className="p-5 transition-colors hover:border-primary/30">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${topic.id === "dbms" ? "bg-mint-soft text-mint" : topic.id === "data-structures" ? "bg-coral-soft text-coral" : topic.id === "networks" ? "bg-sky-soft text-sky" : "bg-primary/10 text-primary"}`}>
            <BookOpen className="size-5" />
          </span>
          <h3 className="text-sm font-semibold text-foreground">{topic.name}</h3>
        </div>
        <ScorePill score={topic.score} />
      </div>
      <ScoreBar score={topic.score} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">{topic.questions} questions completed</span>
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link to="/learning/$topicId" params={{ topicId: topic.id }}>Details <ArrowRight className="size-3.5" /></Link>
        </Button>
      </div>
    </Surface>
  );
}

export function TopicActionLink({ topicId, children }: { topicId: TopicId; children: ReactNode }) {
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) return null;
  return <Link to="/learning/$topicId" params={{ topicId }}>{children}</Link>;
}

export function RecommendationCard({ title, text, link }: { title: string; text: string; link: string }) {
  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary"><Sparkles className="size-4" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p>
      </div>
      <Button asChild variant="ghost" size="icon" aria-label={`Open ${title}`}>
        <Link to={link as "/study-plan" | "/learning/$topicId"}><ArrowRight className="size-4" /></Link>
      </Button>
    </div>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="py-10 text-center"><p className="text-sm font-semibold text-foreground">{title}</p><p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{detail}</p></div>;
}