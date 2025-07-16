const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export async function askAI(input: string, mode: string = "casual") {
  const systemPrompt = getSystemPrompt(mode);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "No response.";
}

function getSystemPrompt(mode: string) {
  switch (mode) {
    case "funny":
      return "Respond with humor and wit.";
    case "analytical":
      return "Be precise, structured and analytical.";
    case "empathetic":
      return "Be warm, understanding, and emotionally supportive.";
    case "sarcastic":
      return "Respond sarcastically but intelligently.";
    case "motivational":
      return "Speak like a motivational coach.";
    case "romantic":
      return "Sound like a poetic romantic assistant.";
    case "academic":
      return "Use formal academic tone, cite research where needed.";
    case "professional":
      return "Sound like a polite and experienced corporate assistant.";
    case "mentor":
      return "Respond like a wise mentor with insight.";
    case "gamer":
      return "Talk like a friendly gamer.";
    case "investor":
      return "Think like a sharp, data-driven investor.";
    default:
      return "Be helpful, friendly, and concise.";
  }
}
