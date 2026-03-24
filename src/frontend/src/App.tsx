import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  NotebookPen,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ---- Types ----
interface Task {
  id: string;
  emoji: string;
  title: string;
  time: string;
  session: "morning" | "afternoon" | "evening";
}

interface Goal {
  id: string;
  emoji: string;
  text: string;
}

type Session = "morning" | "afternoon" | "evening";

// ---- Static Data ----
const TASKS: Task[] = [
  {
    id: "python-course",
    emoji: "🐍",
    title: "Python Course",
    time: "9:10 – 11:00",
    session: "morning",
  },
  {
    id: "dsa",
    emoji: "🧩",
    title: "DSA",
    time: "11:10 – 12:30",
    session: "morning",
  },
  {
    id: "python-practice",
    emoji: "💻",
    title: "Python Practice",
    time: "1:15 – 2:30",
    session: "afternoon",
  },
  {
    id: "html",
    emoji: "🌐",
    title: "HTML Course + Notes",
    time: "2:30 – 4:00",
    session: "afternoon",
  },
  {
    id: "revise",
    emoji: "📚",
    title: "Revise All Topics",
    time: "4:10 – 6:00",
    session: "evening",
  },
];

const GOALS: Goal[] = [
  { id: "goal-python", emoji: "🐍", text: "Complete Python Course module" },
  { id: "goal-dsa", emoji: "🧩", text: "Solve 2 DSA problems" },
  { id: "goal-project", emoji: "🛠️", text: "Build a Python mini project" },
  { id: "goal-revise", emoji: "📝", text: "Revise all notes thoroughly" },
];

const SESSION_CONFIG = {
  morning: {
    label: "🌅 Morning",
    bg: "#FFF0F3",
    border: "#FFD6E0",
    badge: "bg-pink-100 text-pink-700",
    placeholder: "What did you learn this morning?",
  },
  afternoon: {
    label: "☀️ Afternoon",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    badge: "bg-blue-100 text-blue-700",
    placeholder: "What did you learn this afternoon?",
  },
  evening: {
    label: "🌙 Evening",
    bg: "#F0FFF4",
    border: "#BBF7D0",
    badge: "bg-green-100 text-green-700",
    placeholder: "What did you learn this evening?",
  },
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function todayKey() {
  const d = new Date();
  return `planner-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ---- Progress Ring ----
function ProgressRing({
  percent,
  completed,
  total,
}: { percent: number; completed: number; total: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        role="img"
        aria-label={`Progress: ${percent}% completed (${completed} of ${total} tasks done)`}
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#E9E9EF"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#5C9DF0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
        />
        <text
          x="64"
          y="58"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "22px",
            fill: "#4a5568",
          }}
        >
          {percent}%
        </text>
        <text
          x="64"
          y="78"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            fill: "#9ca3af",
          }}
        >
          {completed}/{total} done
        </text>
      </svg>
    </div>
  );
}

// ---- Task Card ----
function TaskCard({
  task,
  checked,
  onToggle,
  index,
}: { task: Task; checked: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border transition-all duration-200",
        checked
          ? "opacity-60 bg-white/40 border-gray-200"
          : "bg-white/80 border-gray-100 shadow-xs hover:shadow-card",
      )}
    >
      <Checkbox
        id={task.id}
        checked={checked}
        onCheckedChange={onToggle}
        className="mt-0.5 rounded-md border-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        data-ocid={`task.checkbox.${index + 1}`}
      />
      <label htmlFor={task.id} className="flex-1 cursor-pointer">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg leading-none">{task.emoji}</span>
          <span
            className={cn(
              "font-bold text-[15px] text-gray-800",
              checked && "line-through text-gray-400",
            )}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500 font-semibold">
            {task.time}
          </span>
        </div>
      </label>
      {checked && (
        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
      )}
    </motion.div>
  );
}

// ---- Session Column ----
function SessionColumn({
  session,
  tasks,
  checkedTasks,
  onToggle,
}: {
  session: Session;
  tasks: Task[];
  checkedTasks: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const config = SESSION_CONFIG[session];
  const done = tasks.filter((t) => checkedTasks[t.id]).length;

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{ background: config.bg, border: `1.5px solid ${config.border}` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-base text-gray-700">
          {config.label}
        </h3>
        <span
          className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            config.badge,
          )}
        >
          {done}/{tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            checked={!!checkedTasks[task.id]}
            onToggle={() => onToggle(task.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

// ---- Notes Card ----
function NotesCard({
  session,
  value,
  onChange,
  index,
}: {
  session: Session;
  value: string;
  onChange: (val: string) => void;
  index: number;
}) {
  const config = SESSION_CONFIG[session];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.38 }}
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{ background: config.bg, border: `1.5px solid ${config.border}` }}
    >
      <div className="flex items-center gap-2">
        <NotebookPen className="w-4 h-4 text-gray-500" />
        <h3 className="font-extrabold text-base text-gray-700">
          {config.label}
        </h3>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={config.placeholder}
        rows={5}
        className="resize-none bg-white/80 border-0 rounded-xl text-sm text-gray-700 font-medium placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-200 shadow-none"
        data-ocid={`notes.${session}.textarea`}
      />
    </motion.div>
  );
}

// ---- Main App ----
export default function App() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [checkedGoals, setCheckedGoals] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<Session, string>>({
    morning: "",
    afternoon: "",
    evening: "",
  });

  const key = todayKey();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          tasks?: Record<string, boolean>;
          goals?: Record<string, boolean>;
          notes?: Record<Session, string>;
        };
        setCheckedTasks(parsed.tasks || {});
        setCheckedGoals(parsed.goals || {});
        if (parsed.notes) {
          setNotes(parsed.notes);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({ tasks: checkedTasks, goals: checkedGoals, notes }),
    );
  }, [checkedTasks, checkedGoals, notes, key]);

  const toggleTask = (id: string) =>
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleGoal = (id: string) =>
    setCheckedGoals((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateNote = (session: Session, value: string) =>
    setNotes((prev) => ({ ...prev, [session]: value }));

  const resetDay = () => {
    setCheckedTasks({});
    setCheckedGoals({});
    setNotes({ morning: "", afternoon: "", evening: "" });
  };

  const completedCount = TASKS.filter((t) => checkedTasks[t.id]).length;
  const pendingCount = TASKS.length - completedCount;
  const percent = Math.round((completedCount / TASKS.length) * 100);
  const pendingTasks = TASKS.filter((t) => !checkedTasks[t.id]);

  const scoreLabel =
    percent === 100
      ? "🎉 Perfect! Amazing!"
      : percent >= 80
        ? "🌟 Almost there!"
        : percent >= 60
          ? "💪 Keep going!"
          : percent >= 40
            ? "😊 Good progress!"
            : percent > 0
              ? "🚀 Just getting started!"
              : "✨ Ready to begin!";

  const now = new Date();
  const dayName = DAYS[now.getDay()];
  const monthName = MONTHS[now.getMonth()];
  const dateStr = `${dayName}, ${monthName} ${now.getDate()}, ${now.getFullYear()}`;

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="font-extrabold text-lg text-gray-700">
              StudyPlanner ✨
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-500 hidden sm:block">
              📅 {dateStr}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={resetDay}
              className="rounded-xl text-xs font-bold border-pink-200 text-pink-500 hover:bg-pink-50"
              data-ocid="planner.reset_day.button"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset Day
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-700">
            Good Morning! 🌸
          </h1>
          <p className="text-gray-500 mt-1 font-semibold text-sm sm:text-base">
            📅 {dateStr} &nbsp;·&nbsp; Let's make today productive!
          </p>
        </motion.div>

        {/* Progress + Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-white/90 rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col gap-3"
            data-ocid="planner.progress.card"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h2 className="font-extrabold text-base text-gray-700">
                📊 Daily Progress
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <ProgressRing
                percent={percent}
                completed={completedCount}
                total={TASKS.length}
              />
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                    <span>Overall Completion</span>
                    <span className="text-blue-500">{percent}%</span>
                  </div>
                  <Progress
                    value={percent}
                    className="h-2.5 rounded-full bg-blue-100"
                    data-ocid="planner.progress.bar"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-xl p-2.5 text-center border border-green-100">
                    <div className="text-xl font-extrabold text-green-500">
                      {completedCount}
                    </div>
                    <div className="text-xs font-semibold text-green-600">
                      ✅ Done
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-2.5 text-center border border-orange-100">
                    <div className="text-xl font-extrabold text-orange-400">
                      {pendingCount}
                    </div>
                    <div className="text-xs font-semibold text-orange-500">
                      ⏳ Pending
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl px-3 py-2 text-center">
                  <span className="text-sm font-bold text-blue-600">
                    {scoreLabel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-white/90 rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col gap-3"
            data-ocid="planner.goals.card"
          >
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <h2 className="font-extrabold text-base text-gray-700">
                🎯 Daily Goals
              </h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {GOALS.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl border transition-all",
                    checkedGoals[goal.id]
                      ? "bg-purple-50/60 border-purple-100 opacity-70"
                      : "bg-gray-50/50 border-gray-100",
                  )}
                  data-ocid={`goals.item.${i + 1}`}
                >
                  <Checkbox
                    id={goal.id}
                    checked={!!checkedGoals[goal.id]}
                    onCheckedChange={() => toggleGoal(goal.id)}
                    className="rounded-md border-2 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    data-ocid={`goals.checkbox.${i + 1}`}
                  />
                  <label
                    htmlFor={goal.id}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <span className="text-base">{goal.emoji}</span>
                    <span
                      className={cn(
                        "text-sm font-semibold text-gray-700",
                        checkedGoals[goal.id] && "line-through text-gray-400",
                      )}
                    >
                      {goal.text}
                    </span>
                  </label>
                  {checkedGoals[goal.id] && (
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <h2 className="font-extrabold text-base text-gray-600 mb-3">
            ⏰ Today's Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["morning", "afternoon", "evening"] as const).map((session) => (
              <SessionColumn
                key={session}
                session={session}
                tasks={TASKS.filter((t) => t.session === session)}
                checkedTasks={checkedTasks}
                onToggle={toggleTask}
              />
            ))}
          </div>
        </motion.div>

        {/* Session Notes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          data-ocid="notes.section"
        >
          <div className="flex items-center gap-2 mb-3">
            <NotebookPen className="w-4 h-4 text-gray-500" />
            <h2 className="font-extrabold text-base text-gray-600">
              📝 Session Notes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["morning", "afternoon", "evening"] as const).map(
              (session, i) => (
                <NotesCard
                  key={session}
                  session={session}
                  value={notes[session]}
                  onChange={(val) => updateNote(session, val)}
                  index={i}
                />
              ),
            )}
          </div>
        </motion.div>

        {/* Summary + Reminders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="bg-white/90 rounded-2xl shadow-card border border-gray-100 p-5"
            data-ocid="planner.summary.card"
          >
            <h2 className="font-extrabold text-base text-gray-700 mb-4">
              📌 Summary
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                <div className="text-2xl font-extrabold text-green-500">
                  {completedCount}
                </div>
                <div className="text-xs font-bold text-green-600 mt-0.5">
                  ✅ Completed
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                <div className="text-2xl font-extrabold text-orange-400">
                  {pendingCount}
                </div>
                <div className="text-xs font-bold text-orange-500 mt-0.5">
                  ⏳ Pending
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                <div className="text-2xl font-extrabold text-blue-500">
                  {percent}%
                </div>
                <div className="text-xs font-bold text-blue-600 mt-0.5">
                  📊 Score
                </div>
              </div>
            </div>
            <div
              className={cn(
                "rounded-xl p-3 text-center font-bold text-sm",
                percent === 100
                  ? "bg-green-100 text-green-700"
                  : percent >= 60
                    ? "bg-blue-50 text-blue-600"
                    : "bg-pink-50 text-pink-600",
              )}
            >
              {scoreLabel}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-white/90 rounded-2xl shadow-card border border-gray-100 p-5"
            data-ocid="planner.reminders.card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-amber-400" />
              <h2 className="font-extrabold text-base text-gray-700">
                🔔 Reminders
              </h2>
              {pendingTasks.length > 0 && (
                <span className="ml-auto bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingTasks.length} pending
                </span>
              )}
            </div>
            {pendingTasks.length === 0 ? (
              <div
                className="text-center py-6"
                data-ocid="reminders.empty_state"
              >
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-green-600 font-bold text-sm">
                  All tasks completed!
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Amazing work today! 🌟
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {pendingTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.06 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50 border border-amber-100"
                    data-ocid={`reminders.item.${i + 1}`}
                  >
                    <span className="text-base shrink-0">{task.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700 truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-amber-600 font-semibold">
                        {task.time}
                      </p>
                    </div>
                    <span className="text-amber-400 text-xs font-bold shrink-0">
                      ⏰
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <footer className="text-center text-xs text-gray-400 font-semibold py-4">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-pink-400">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </main>
    </div>
  );
}
