import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CircleAlert } from "lucide-react";
import { AppShell } from "@/components/learnwise/app-shell";
import { DemoLabel, PageHeading, ScoreBar, ScorePill, SectionTitle, Surface } from "@/components/learnwise/ui";
import { Button } from "@/components/ui/button";
import { topics } from "@/lib/learnwise-data";

export const Route = createFileRoute("/learning/$topicId")({
  head: () => ({ meta: [
    { title: "Subject details | LearnWise AI" },
    { name: "description", content: "Explore sample assessment history, strengths, and practice areas for a LearnWise AI subject." },
    { property: "og:title", content: "Subject details | LearnWise AI" },
    { property: "og:description", content: "Sample topic history and practice areas from the LearnWise AI demo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TopicDetailPage,
});

function TopicDetailPage() {
  const { topicId } = Route.useParams();
  const topic = topics.find((item) => item.id === topicId);

  if (!topic) return <AppShell><div className="py-20 text-center"><h1 className="text-2xl font-bold">Subject not found</h1><Button asChild className="mt-4"><Link to="/learning">Back to My Learning</Link></Button></div></AppShell>;

  return <AppShell>
    <div className="mb-5"><Button asChild variant="ghost" size="sm"><Link to="/learning"><ArrowLeft /> All subjects</Link></Button></div>
    <PageHeading eyebrow="Subject details" title={topic.name} description="Explore how your sample assessment scores have changed and what to practice next." action={<DemoLabel />} />
    <div className="mb-6 grid gap-4 md:grid-cols-[1fr_2fr]">
      <Surface className="flex items-center gap-5 p-5"><div className="flex size-16 shrink-0 items-center justify-center rounded-full border-[5px] border-primary/15 text-xl font-bold text-primary" style={{ borderTopColor: topic.color }}>{topic.score}%</div><div><p className="text-sm font-semibold">Latest assessment</p><p className="mt-1 text-xs text-muted-foreground">{topic.questions} practice questions completed</p><div className="mt-2"><ScorePill score={topic.score} /></div></div></Surface>
      <Surface className="p-5"><SectionTitle title="Assessment history" detail="Sample quiz scores · most recent first" /><div className="flex items-end gap-4 pt-2">{topic.history.map((entry) => <div key={entry.label} className="flex flex-1 flex-col items-center gap-2"><span className="text-xs font-semibold">{entry.score}%</span><div className="flex h-20 w-full items-end"><div className="w-full rounded-t-sm bg-primary/70" style={{ height: `${entry.score}%` }} /></div><span className="text-xs text-muted-foreground">{entry.label}</span></div>)}</div></Surface>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <Surface className="p-5"><SectionTitle title="What’s going well" detail="Strengths shown in sample assessments" />{topic.strengths.map((strength) => <div key={strength} className="flex items-center gap-2 border-t border-border py-3 first:border-0"><Check className="size-4 text-success" /><span className="text-sm">{strength}</span></div>)}</Surface>
      <Surface className="p-5"><SectionTitle title="Areas to strengthen" detail="Practice suggestions based on sample results" />{topic.improvements.map((improvement) => <div key={improvement} className="flex items-center gap-2 border-t border-border py-3 first:border-0"><CircleAlert className="size-4 text-warning" /><span className="text-sm">{improvement}</span></div>)}</Surface>
    </div>
    <Surface className="mt-5 flex flex-wrap items-center justify-between gap-4 p-5"><div><h2 className="text-base font-semibold">Ready for a practice round?</h2><p className="mt-1 text-sm text-muted-foreground">Try a mixed-topic demo quiz to review all four subjects.</p><div className="mt-3 w-48"><ScoreBar score={topic.score} showLabel /></div></div><Button asChild><Link to="/quiz">Open practice quiz <ArrowRight /></Link></Button></Surface>
  </AppShell>;
}