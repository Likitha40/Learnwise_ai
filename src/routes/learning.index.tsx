import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/learnwise/app-shell";
import { DemoLabel, PageHeading, SectionTitle, TopicCard } from "@/components/learnwise/ui";
import { Button } from "@/components/ui/button";
import { topics } from "@/lib/learnwise-data";

export const Route = createFileRoute("/learning/")({
  head: () => ({ meta: [
    { title: "My Learning | LearnWise AI" },
    { name: "description", content: "Explore sample progress and assessment scores across Ananya Rao’s four learning subjects." },
    { property: "og:title", content: "My Learning | LearnWise AI" },
    { property: "og:description", content: "Topic progress and sample scores across four subjects." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: LearningPage,
});

function LearningPage() {
  return <AppShell>
    <PageHeading eyebrow="Your subjects" title="My learning" description="A closer look at your sample assessment progress, strengths, and next steps." action={<DemoLabel />} />
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="border-l-2 border-primary pl-3"><p className="text-xs text-muted-foreground">Subjects</p><p className="mt-1 text-xl font-bold">4</p></div>
      <div className="border-l-2 border-sky pl-3"><p className="text-xs text-muted-foreground">Practice questions</p><p className="mt-1 text-xl font-bold">48</p></div>
      <div className="border-l-2 border-mint pl-3"><p className="text-xs text-muted-foreground">Average score</p><p className="mt-1 text-xl font-bold">72%</p></div>
      <div className="border-l-2 border-coral pl-3"><p className="text-xs text-muted-foreground">Growing subjects</p><p className="mt-1 text-xl font-bold">4 of 4</p></div>
    </div>
    <SectionTitle title="All subjects" detail="Choose a subject to explore your sample assessment history and practice ideas." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
      <p className="max-w-lg text-sm text-muted-foreground">Want a focused session? Try a short quiz across all four subjects.</p>
      <Button asChild><Link to="/quiz">Start a practice quiz <ArrowRight /></Link></Button>
    </div>
  </AppShell>;
}