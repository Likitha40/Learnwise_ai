import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { AppShell } from "@/components/learnwise/app-shell";
import { DemoLabel, PageHeading, ScoreBar, SectionTitle, Surface } from "@/components/learnwise/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, scoreQuiz, topics, type QuizResult } from "@/lib/learnwise-data";

const STORAGE_KEY = "learnwise-latest-quiz-v1";
function readLatestResult(): QuizResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || !("score" in parsed) || typeof parsed.score !== "number" || !("answers" in parsed) || !Array.isArray(parsed.answers)) return null;
    return parsed as QuizResult;
  } catch { return null; }
}

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [
    { title: "Practice Quiz | LearnWise AI" },
    { name: "description", content: "Try an eight-question sample quiz across Python, DBMS, Data Structures, and Computer Networks." },
    { property: "og:title", content: "Practice Quiz | LearnWise AI" },
    { property: "og:description", content: "A functional sample practice quiz across four computer science subjects." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: QuizPage,
});

function QuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(quizQuestions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [previousResult, setPreviousResult] = useState<QuizResult | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => setPreviousResult(readLatestResult()), []);

  const question = quizQuestions[current];
  const topic = topics.find((item) => item.id === question.topicId);

  function submitQuiz() {
    const next = scoreQuiz(answers);
    setResult(next);
    setPreviousResult(next);
    setStarted(false);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Results remain available for this session. */ }
  }

  function startFresh() {
    setAnswers(Array(quizQuestions.length).fill(null));
    setCurrent(0);
    setResult(null);
    setStarted(true);
  }

  if (result) return <AppShell>
    <PageHeading eyebrow="Quiz complete" title="Your results" description="Review your answers and see how each subject went." action={<DemoLabel />} />
    <Surface className="mb-5 flex flex-wrap items-center justify-between gap-5 p-5 sm:p-7">
      <div><p className="text-xs font-bold uppercase text-muted-foreground">Overall score</p><p className="mt-2 font-display text-5xl font-extrabold text-primary">{result.score}%</p><p className="mt-2 text-sm text-muted-foreground">{result.correct} correct out of {result.total}</p></div>
      <div className="min-w-[220px] flex-1 sm:max-w-md"><p className="mb-2 text-sm font-semibold">Topic performance</p>{topics.map((item) => { const score = result.topicScores[item.id]; const value = score.total ? Math.round((score.correct / score.total) * 100) : 0; return <div key={item.id} className="mb-3"><div className="mb-1 flex justify-between text-xs"><span>{item.shortName}</span><span>{score.correct}/{score.total}</span></div><Progress value={value} className="h-1.5 bg-muted [&>div]:bg-primary" /></div>; })}</div>
    </Surface>
    <SectionTitle title="Answer review" detail="Correct answers and short explanations." />
    <div className="space-y-3">{quizQuestions.map((item, index) => { const correct = result.answers[index] === item.answer; const topicName = topics.find((itemTopic) => itemTopic.id === item.topicId)?.shortName ?? "Subject"; return <Surface key={item.id} className="p-4 sm:p-5"><div className="mb-2 flex items-center justify-between gap-3"><p className="text-sm font-semibold">{index + 1}. {item.prompt}</p><Badge variant={correct ? "success" : "warning"}>{correct ? "Correct" : "Review"}</Badge></div><p className="text-xs text-muted-foreground">{topicName} · Your answer: {result.answers[index] === null ? "Not answered" : item.options[result.answers[index] ?? 0]}</p>{!correct && <p className="mt-1 text-xs font-medium text-success-foreground">Correct answer: {item.options[item.answer]}</p>}<p className="mt-2 text-sm leading-5 text-muted-foreground">{item.explanation}</p></Surface>; })}</div>
    <div className="mt-6 flex flex-wrap gap-3"><Button onClick={startFresh}><RotateCcw /> Try again</Button><Button asChild variant="outline"><Link to="/insights">View progress <ArrowRight /></Link></Button></div>
  </AppShell>;

  if (!started) return <AppShell>
    <PageHeading eyebrow="Practice" title="Quick knowledge check" description="Eight sample questions across your computer science subjects." action={<DemoLabel />} />
    <Surface className="mx-auto max-w-2xl p-6 sm:p-9">
      <div className="mb-5 flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary"><Check className="size-6" /></div>
      <h2 className="text-xl font-bold">A little practice goes a long way.</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">This short demo covers Python, DBMS, Data Structures, and Computer Networks. You’ll see explanations and a topic breakdown at the end.</p>
      <div className="my-6 grid grid-cols-2 gap-3 border-y border-border py-4 sm:grid-cols-4"><div><p className="text-lg font-bold">8</p><p className="text-xs text-muted-foreground">Questions</p></div><div><p className="text-lg font-bold">4</p><p className="text-xs text-muted-foreground">Subjects</p></div><div><p className="text-lg font-bold">~5 min</p><p className="text-xs text-muted-foreground">Estimated time</p></div><div><p className="text-lg font-bold">No timer</p><p className="text-xs text-muted-foreground">Take your time</p></div></div>
      {previousResult && <p className="mb-4 text-sm text-muted-foreground">Latest result: <span className="font-semibold text-foreground">{previousResult.score}%</span> · {previousResult.correct}/{previousResult.total} correct</p>}
      <Button onClick={startFresh}>Start the quiz <ArrowRight /></Button>
    </Surface>
  </AppShell>;

  const selected = answers[current];
  const allAnswered = answers.every((answer) => answer !== null);
  return <AppShell>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><Button variant="ghost" size="sm" onClick={() => setStarted(false)}><ArrowLeft /> Exit quiz</Button><DemoLabel /></div>
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between text-sm"><span className="font-semibold">Question {current + 1} of {quizQuestions.length}</span><span className="text-muted-foreground">{topic?.shortName}</span></div>
      <Progress value={((current + 1) / quizQuestions.length) * 100} className="mb-6 h-2 bg-muted [&>div]:bg-primary" />
      <Surface className="p-5 sm:p-8">
        <h1 className="text-xl font-bold leading-snug sm:text-2xl">{question.prompt}</h1>
        <div className="mt-6 space-y-2.5" role="radiogroup" aria-label="Answer options">{question.options.map((option, index) => { const chosen = selected === index; return <button key={option} type="button" role="radio" aria-checked={chosen} onClick={() => setAnswers((previous) => previous.map((answer, answerIndex) => answerIndex === current ? index : answer))} className={`flex min-h-12 w-full items-center gap-3 rounded-sm border p-3 text-left text-sm transition-colors ${chosen ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/50"}`}><span className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${chosen ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{String.fromCharCode(65 + index)}</span>{option}</button>; })}</div>
      </Surface>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><Button variant="outline" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}><ArrowLeft /> Previous</Button><p className="text-xs text-muted-foreground">{answers.filter((answer) => answer !== null).length} answered</p>{current < quizQuestions.length - 1 ? <Button onClick={() => setCurrent((value) => Math.min(quizQuestions.length - 1, value + 1))}>Next <ArrowRight /></Button> : <Button onClick={submitQuiz} disabled={!allAnswered}>Submit quiz <Check /></Button>}</div>
      {!allAnswered && current === quizQuestions.length - 1 && <p className="mt-3 text-right text-xs text-muted-foreground">Answer each question before submitting.</p>}
    </div>
  </AppShell>;
}