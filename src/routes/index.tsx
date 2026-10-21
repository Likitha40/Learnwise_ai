import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, BookOpenCheck, CircleHelp, Clock3, Flame, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/learnwise/app-shell";
import { DemoLabel, PageHeading, RecommendationCard, ScoreBar, SectionTitle, Surface, TopicCard } from "@/components/learnwise/ui";
import { topics, weeklyPerformance } from "@/lib/learnwise-data";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnWise AI | Student Dashboard" },
      { name: "description", content: "Explore Ananya Rao’s sample learning progress, topic scores, and personalized study recommendations." },
      { property: "og:title", content: "LearnWise AI | Student Dashboard" },
      { property: "og:description", content: "A clear view of sample academic progress and suggested next steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Average assessment", value: "76%", note: "+6 pts over 6 weeks", icon: Target, tint: "bg-primary/10 text-primary" },
  { label: "Topics to revisit", value: "2", note: "DBMS & Data Structures", icon: BookOpenCheck, tint: "bg-coral-soft text-coral" },
  { label: "Questions practiced", value: "48", note: "Across 4 subjects", icon: Zap, tint: "bg-sky-soft text-sky" },
  { label: "Weekly study goal", value: "72%", note: "3h 36m of 5h", icon: Flame, tint: "bg-mint-soft text-mint" },
];

function DashboardPage() {
  return <AppShell>
    <PageHeading eyebrow="Tuesday, October 21" title="Welcome back, Ananya!" description="Small, steady sessions add up. Here’s where your learning stands today." action={<DemoLabel />} />
    <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ label, value, note, icon: Icon, tint }) => <Surface key={label} className="p-4 sm:p-5"><div className="flex items-center justify-between gap-2"><p className="text-xs font-medium text-muted-foreground sm:text-sm">{label}</p><span className={`flex size-8 shrink-0 items-center justify-center rounded-sm ${tint}`}><Icon className="size-4" /></span></div><p className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{value}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground sm:text-xs">{note}</p></Surface>)}
    </div>
    <div className="mb-7 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Surface className="p-5 sm:p-6">
        <SectionTitle title="Assessment performance" detail="Weekly average score · sample assessment data" action={<span className="flex items-center gap-1.5 text-xs font-semibold text-success-foreground"><Activity className="size-3.5" /> +14 pts</span>} />
        <div className="h-[225px] w-full pt-2"><ResponsiveContainer width="100%" height="100%"><LineChart data={weeklyPerformance} margin={{ left: -16, right: 6, top: 8, bottom: 0 }}><CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 5" /><XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} tickFormatter={(value) => `${value}%`} /><Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 5, color: "var(--foreground)" }} formatter={(value) => [`${value}%`, "Average score"]} /><Line type="monotone" dataKey="score" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4, fill: "var(--card)", strokeWidth: 2, stroke: "var(--chart-1)" }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div>
      </Surface>
      <Surface className="p-5 sm:p-6">
        <SectionTitle title="Score by subject" detail="Latest sample assessment" />
        <div className="h-[225px] w-full pt-2"><ResponsiveContainer width="100%" height="100%"><BarChart data={topics} margin={{ left: -16, right: 0, top: 10, bottom: 0 }}><CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 5" /><XAxis dataKey="shortName" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} /><YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickFormatter={(value) => `${value}`} /><Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 5, color: "var(--foreground)" }} formatter={(value) => [`${value}%`, "Score"]} /><Bar dataKey="score" fill="var(--chart-1)" radius={[3, 3, 0, 0]} maxBarSize={35} /></BarChart></ResponsiveContainer></div>
      </Surface>
    </div>
    <div className="grid items-start gap-7 xl:grid-cols-[1.55fr_1fr]">
      <div>
        <SectionTitle title="Your subjects" detail="Progress at a glance" action={<Button asChild variant="ghost" size="sm"><Link to="/learning">View all <ArrowRight className="size-3.5" /></Link></Button>} />
        <div className="grid gap-3 sm:grid-cols-2">{topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}</div>
      </div>
      <div className="space-y-5">
        <Surface className="p-5">
          <SectionTitle title="Needs attention" detail="A little extra practice can help." />
          <RecommendationCard title="DBMS · Normalization" text="At 58%, this is your lowest sample score. Start with a quick 1NF–BCNF review." link="/study-plan" />
          <div className="my-1 border-t border-border" />
          <RecommendationCard title="Data Structures · Trees" text="Revisit tree traversals to strengthen your next assessment." link="/study-plan" />
        </Surface>
        <Surface className="p-5">
          <SectionTitle title="This week’s learning" detail="Sample weekly goal · 5 hours" action={<Clock3 className="size-4 text-muted-foreground" />} />
          <div className="mb-4 flex items-end justify-between"><span className="font-display text-3xl font-bold">3h 36m</span><span className="text-sm text-muted-foreground">of 5h</span></div>
          <ScoreBar score={72} />
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button asChild><Link to="/quiz">Start a quiz <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/study-plan"><CircleHelp /> Study plan</Link></Button>
          </div>
        </Surface>
      </div>
    </div>
  </AppShell>;
}