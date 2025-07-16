import { useState } from "react";
import { askAI } from "../lib/ai";

const modes = [
  { value: "casual", label: "😎 Casual" },
  { value: "funny", label: "😂 Funny" },
  { value: "analytical", label: "🧠 Analytical" },
  { value: "empathetic", label: "😢 Empathetic" },
  { value: "sarcastic", label: "😏 Sarcastic" },
  { value: "motivational", label: "💪 Motivational" },
  { value: "romantic", label: "💘 Romantic" },
  { value: "academic", label: "🎓 Academic" },
  { value: "professional", label: "💼 Professional" },
  { value: "mentor", label: "🧙 Mentor" },
  { value: "gamer", label: "🎮 Gamer" },
  { value: "investor", label: "💸 Investor" },
];

function getRandomMode() {
  return modes[Math.floor(Math.random() * modes.length)].value;
}

export default function AIvsAI() {
  const [ai1Mode, setAi1Mode] = useState(getRandomMode());
  const [ai2Mode, setAi2Mode] = useState(getRandomMode());
  const [prompt, setPrompt] = useState("What’s your opinion on love and logic?");
  const [chat, setChat] = useState<string[]>([]);
  const [turn, setTurn] = useState(0);
  const [running, setRunning] = useState(false);

  async function runTurn(prev: string, mode: string): Promise<string> {
    const response = await askAI(prev, mode);
    return response;
  }

  async function handleStart() {
    setChat([]);
    setRunning(true);
    let current = `AI 1 (${ai1Mode}): ${prompt}`;
    setChat([current]);

    let next = prompt;
    for (let i = 0; i < 6; i++) {
      const mode = i % 2 === 0 ? ai2Mode : ai1Mode;
      const label = i % 2 === 0 ? "AI 2" : "AI 1";
      next = await runTurn(next, mode);
      current = `${label} (${mode}): ${next}`;
      setChat((prev) => [...prev, current]);
      await new Promise((r) => setTimeout(r, 1000));
    }
    setRunning(false);
  }

  function resetBattle() {
    setPrompt("");
    setChat([]);
    setAi1Mode(getRandomMode());
    setAi2Mode(getRandomMode());
    setTurn(0);
    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center">🤖 AI vs AI Duel</h1>

      <div className="flex gap-4 w-full max-w-xl">
        <div className="flex-1">
          <label className="block text-sm font-medium">AI 1 Personality</label>
          <select
            value={ai1Mode}
            onChange={(e) => setAi1Mode(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {modes.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">AI 2 Personality</label>
          <select
            value={ai2Mode}
            onChange={(e) => setAi2Mode(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {modes.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        className="w-full max-w-xl border p-2 rounded"
        placeholder="Starting Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={running || !prompt}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          🔁 Start Duel
        </button>
        <button
          onClick={resetBattle}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ♻️ New Duel
        </button>
      </div>

      <div className="w-full max-w-2xl bg-gray-100 rounded p-4 space-y-2 text-sm h-96 overflow-auto">
        {chat.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}
