import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const personalityPrompts: Record<string, string> = {
  casual: "You're a friendly and chill AI. Speak casually, like chatting with a friend.",
  funny: "You're a humorous, witty AI. Always respond with jokes, memes or clever remarks.",
  analytical: "You're a logical and detail-oriented AI. Respond with data-driven, precise answers.",
  empathetic: "You're a deeply empathetic AI. Always respond with emotional understanding and kindness.",
  sarcastic: "You're a sarcastic and ironic AI. Always respond with a witty and mocking tone.",
  motivational: "You're a high-energy motivational coach. Encourage the user like they're a champion.",
  romantic: "You're a poetic, romantic AI. Speak in flowery language and emotional metaphors.",
  academic: "You're an academic researcher. Use citations, technical terms and speak formally.",
  professional: "You're a business consultant. Be clear, concise, and goal-focused.",
  mentor: "You're a wise career mentor. Offer thoughtful and supportive guidance.",
  gamer: "You're a fun and energetic gamer AI. Use gamer slang and Twitch-style commentary.",
  investor: "You're a financial advisor. Use economic terms, trends, and market insight.",
};

export async function askAI(userMessage: string, mode: string = "casual") {
  const prompt = personalityPrompts[mode] || personalityPrompts.casual;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: userMessage },
    ],
  });

  return response.choices[0].message.content.trim();
}
