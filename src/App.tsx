import { useState } from "react";
import { askAI } from "./lib/ai";

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("casual");
  const [summary, setSummary] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState<number[]>([]);

  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);
    setChat((prev) => [...prev, { role: "user", content: input }]);

    const response = await askAI(input, mode);
    setChat((prev) => [...prev, { role: "assistant", content: response }]);
    setInput("");

    const suggest = await askAI(
      `Based on the following conversation, suggest one smart follow-up question the user might ask next:\n${input}\nAI: ${response}`,
      mode
    );
    setSuggestion(suggest);
    setLoading(false);
  }

  async function handleSummarize() {
    const allMessages = chat.map((m) => `${m.role}: ${m.content}`).join("\n");
    const response = await askAI(
      `Please summarize this entire conversation in a short, clear paragraph:\n${allMessages}`,
      mode
    );
    setSummary(response);
  }

  function exportChat() {
    const content = chat.map((m) => `${m.role}: ${m.content}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  function resetChat() {
    setChat([]);
    setSummary("");
    setSuggestion("");
    setFeedbackGiven([]);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">🧠 Smart AI Chat</h1>

        <div className="flex justify-center">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-2 rounded mb-2"
          >
            {[
              "casual",
              "funny",
              "analytical",
              "empathetic",
              "sarcastic",
              "motivational",
              "romantic",
              "academic",
              "professional",
              "mentor",
              "gamer",
              "investor",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {[
            "What should I study?",
            "Give me a productivity tip",
            "Explain AI like I'm 5",
            "Summarize this conversation",
          ].map((preset) => (
            <button
              key={preset}
              onClick={() => setInput(preset)}
              className="bg-gray-200 text-sm px-3 py-1 rounded"
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-2 bg-gray-100">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-300 text-black self-start mr-auto"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" && !feedbackGiven.includes(idx) && (
                <div className="text-xs mt-1">
                  <button
                    onClick={() => setFeedbackGiven((f) => [...f, idx])}
                    className="mr-2 text-green-600 hover:underline"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => setFeedbackGiven((f) => [...f, idx])}
                    className="text-red-600 hover:underline"
                  >
                    👎
                  </button>
                </div>
              )}
              {msg.role === "assistant" && feedbackGiven.includes(idx) && (
                <div className="text-xs text-gray-500">Thanks for your feedback!</div>
              )}
            </div>
          ))}
          {loading && <div className="text-sm text-gray-500">AI is thinking...</div>}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border p-2 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            Send
          </button>
        </div>

        {suggestion && (
          <div className="mt-4 p-4 bg-blue-100 border rounded">
            <strong>Suggested next question:</strong> {suggestion}
          </div>
        )}

        <button
          onClick={handleSummarize}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          Summarize Conversation
        </button>
        {summary && (
          <div className="mt-4 p-4 bg-yellow-100 border rounded">
            <strong>Summary:</strong> {summary}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={exportChat}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-2"
          >
            Download Chat as .txt
          </button>
          <button
            onClick={resetChat}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            🔄 Start New Chat
          </button>
        </div>
      </div>
    </div>
  );
}
