import { useState } from "react";
import { askAI } from "../lib/ai";

const personalities = [
  "funny",
  "analytical",
  "empathetic",
  "motivational",
  "romantic",
  "academic",
  "professional",
  "mentor",
  "gamer",
  "investor",
];

export default function AIvsAI() {
  const [ai1, setAi1] = useState("academic");
  const [ai2, setAi2] = useState("motivational");
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("Start a debate about love vs logic");
  const [loading, setLoading] = useState(false);

  async function startDebate() {
    setLoading(true);
    setMessages([]);
    let msg = input;
    for (let i = 0; i < 2; i++) {
      const res1 = await askAI(msg, ai1);
      setMessages((prev) => [...prev, `AI 1: ${res1}`]);
      msg = res1;

      const res2 = await askAI(msg, ai2);
      setMessages((prev) => [...prev, `AI 2: ${res2}`]);
      msg = res2;
    }
    setLoading(false);
  }

  function randomize() {
    const a1 = personalities[Math.floor(Math.random() * personalities.length)];
    let a2 = a1;
    while (a2 === a1) {
      a2 = personalities[Math.floor(Math.random() * personalities.length)];
    }
    setAi1(a1);
    setAi2(a2);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">🤖 AI vs AI Duel</h1>

      <div className="flex gap-4 justify-center">
        <select
          value={ai1}
          onChange={(e) => setAi1(e.target.value)}
          className="border p-2 rounded"
        >
          {personalities.map((p) => (
            <option key={p} value={p}>
              AI 1: {p}
            </option>
          ))}
        </select>

        <select
          value={ai2}
          onChange={(e) => setAi2(e.target.value)}
          className="border p-2 rounded"
        >
          {personalities.map((p) => (
            <option key={p} value={p}>
              AI 2: {p}
            </option>
          ))}
        </select>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Starting prompt..."
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2 justify-center">
        <button
          onClick={startDebate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Talking..." : "Start Debate"}
        </button>
        <button onClick={randomize} className="bg-gray-300 px-4 py-2 rounded">
          🎲 Randomize Personalities
        </button>
      </div>

      <div className="bg-gray-100 rounded p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
