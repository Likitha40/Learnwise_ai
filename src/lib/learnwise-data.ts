export type TopicId = "python" | "dbms" | "data-structures" | "networks";

export type LearningTopic = {
  id: TopicId;
  name: string;
  shortName: string;
  score: number;
  questions: number;
  color: string;
  strengths: string[];
  improvements: string[];
  history: { label: string; score: number }[];
};

export const topics: LearningTopic[] = [
  {
    id: "python",
    name: "Python Programming",
    shortName: "Python",
    score: 85,
    questions: 16,
    color: "var(--chart-1)",
    strengths: ["Functions & scope", "Data types", "List operations"],
    improvements: ["Decorators", "Exception handling"],
    history: [
      { label: "Quiz 1", score: 72 },
      { label: "Quiz 2", score: 80 },
      { label: "Quiz 3", score: 85 },
    ],
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    shortName: "DBMS",
    score: 58,
    questions: 12,
    color: "var(--chart-2)",
    strengths: ["SQL basics", "Keys & constraints"],
    improvements: ["Normalization", "Transaction schedules", "Functional dependencies"],
    history: [
      { label: "Quiz 1", score: 49 },
      { label: "Quiz 2", score: 54 },
      { label: "Quiz 3", score: 58 },
    ],
  },
  {
    id: "data-structures",
    name: "Data Structures",
    shortName: "Data Structures",
    score: 64,
    questions: 11,
    color: "var(--chart-3)",
    strengths: ["Arrays & strings", "Stack operations"],
    improvements: ["Tree traversals", "Graph algorithms", "Time complexity"],
    history: [
      { label: "Quiz 1", score: 57 },
      { label: "Quiz 2", score: 60 },
      { label: "Quiz 3", score: 64 },
    ],
  },
  {
    id: "networks",
    name: "Computer Networks",
    shortName: "Computer Networks",
    score: 79,
    questions: 9,
    color: "var(--chart-4)",
    strengths: ["OSI model", "Network topologies"],
    improvements: ["Subnetting", "TCP congestion control"],
    history: [
      { label: "Quiz 1", score: 70 },
      { label: "Quiz 2", score: 76 },
      { label: "Quiz 3", score: 79 },
    ],
  },
];

export const weeklyPerformance = [
  { week: "Sep 2", score: 62 },
  { week: "Sep 9", score: 68 },
  { week: "Sep 16", score: 64 },
  { week: "Sep 23", score: 73 },
  { week: "Sep 30", score: 70 },
  { week: "Oct 7", score: 76 },
];

export const studyTasks = [
  {
    id: "dbms-normalization",
    title: "Practice DBMS normalization",
    topicId: "dbms" as const,
    detail: "1NF through BCNF · 6 questions",
    reason: "Your lowest sample score is in DBMS.",
    duration: 25,
    priority: "High",
  },
  {
    id: "trees-traversals",
    title: "Review trees & traversals",
    topicId: "data-structures" as const,
    detail: "In-order, pre-order & post-order",
    reason: "Tree traversals are an area to strengthen.",
    duration: 20,
    priority: "Medium",
  },
  {
    id: "python-revision",
    title: "Take a Python revision quiz",
    topicId: "python" as const,
    detail: "Revisit exceptions & decorators",
    reason: "A short review will reinforce your strongest topic.",
    duration: 15,
    priority: "Low",
  },
];

export type QuizQuestion = {
  id: string;
  topicId: TopicId;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "py-1",
    topicId: "python",
    prompt: "Which Python keyword defines a function?",
    options: ["func", "def", "function", "lambda"],
    answer: 1,
    explanation: "The `def` keyword begins a named function definition in Python.",
  },
  {
    id: "py-2",
    topicId: "python",
    prompt: "What does `len([3, 5, 8])` return?",
    options: ["2", "3", "8", "An error"],
    answer: 1,
    explanation: "The list contains three items, so `len` returns 3.",
  },
  {
    id: "db-1",
    topicId: "dbms",
    prompt: "Which normal form removes partial dependency on a composite key?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 1,
    explanation: "Second normal form removes partial dependencies on a candidate key.",
  },
  {
    id: "db-2",
    topicId: "dbms",
    prompt: "Which property ensures a transaction is all-or-nothing?",
    options: ["Consistency", "Isolation", "Atomicity", "Durability"],
    answer: 2,
    explanation: "Atomicity ensures a transaction fully completes or has no effect.",
  },
  {
    id: "ds-1",
    topicId: "data-structures",
    prompt: "Which traversal visits a binary search tree in sorted order?",
    options: ["Pre-order", "Post-order", "In-order", "Level-order"],
    answer: 2,
    explanation: "In-order traversal visits left, root, then right, producing sorted keys in a BST.",
  },
  {
    id: "ds-2",
    topicId: "data-structures",
    prompt: "Which data structure is most suitable for breadth-first search?",
    options: ["Stack", "Queue", "Heap", "Hash table"],
    answer: 1,
    explanation: "A queue processes the nearest discovered nodes first in breadth-first search.",
  },
  {
    id: "cn-1",
    topicId: "networks",
    prompt: "Which OSI layer is responsible for routing packets?",
    options: ["Transport", "Network", "Data Link", "Session"],
    answer: 1,
    explanation: "The Network layer handles logical addressing and packet routing.",
  },
  {
    id: "cn-2",
    topicId: "networks",
    prompt: "What does DNS primarily translate?",
    options: ["MAC addresses to ports", "Domain names to IP addresses", "Packets to frames", "URLs to HTML"],
    answer: 1,
    explanation: "DNS resolves human-readable domain names to IP addresses.",
  },
];

export type QuizResult = {
  score: number;
  correct: number;
  total: number;
  answers: (number | null)[];
  completedAt: string;
  topicScores: Record<TopicId, { correct: number; total: number }>;
};

export function scoreQuiz(answers: (number | null)[]): QuizResult {
  const topicScores = Object.fromEntries(
    topics.map((topic) => [topic.id, { correct: 0, total: 0 }]),
  ) as Record<TopicId, { correct: number; total: number }>;

  let correct = 0;
  quizQuestions.forEach((question, index) => {
    const topicResult = topicScores[question.topicId];
    topicResult.total += 1;
    if (answers[index] === question.answer) {
      topicResult.correct += 1;
      correct += 1;
    }
  });

  return {
    score: Math.round((correct / quizQuestions.length) * 100),
    correct,
    total: quizQuestions.length,
    answers,
    completedAt: new Date().toISOString(),
    topicScores,
  };
}

export function prioritizedTopics() {
  return [...topics].sort((first, second) => first.score - second.score);
}