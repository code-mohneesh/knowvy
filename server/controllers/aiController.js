import dotenv from "dotenv";
import Conversation from "../models/conversationModel.js";

dotenv.config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;

// ---------- SIMPLE (NON-STREAM) CHAT ----------
export async function chatWithAI(req, res) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages,
        max_tokens: 700,
      }),
    });

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return res.json({ reply });
  } catch (err) {
    console.error("chatWithAI error:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
}



// ---------- STREAMING CHAT (SSE) ----------
export async function streamChat(req, res) {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    // SSE HEADERS
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Request OpenAI stream
    const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        stream: true,
        messages,
      }),
    });

    if (!openaiResp.ok) {
      const errTxt = await openaiResp.text();
      res.write(`data: ${JSON.stringify({ error: errTxt })}\n\n`);
      return res.end();
    }

    const reader = openaiResp.body.getReader();
    const decoder = new TextDecoder();
    let assistantText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Extract lines like: "data: {json}"
      const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

      for (const line of lines) {
        const jsonStr = line.replace("data: ", "").trim();
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed.choices?.[0]?.delta?.content;

          if (delta) {
            assistantText += delta;
            // send delta text chunk
            res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
          }
        } catch {
          // ignore bad packet
        }
      }
    }

    // STREAM END
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

    // SAVE CONVERSATION TO DB (only after streaming completes)
    if (req.user && req.user._id) {
      await Conversation.findOneAndUpdate(
        { userId: req.user._id },
        {
          messages: [
            ...messages,
            { role: "assistant", content: assistantText },
          ],
        },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error("streamChat error:", err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
}



// ---------- LOAD HISTORY ----------
export async function getHistory(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const convo = await Conversation.findOne({ userId: req.user._id });
    if (!convo) return res.json({ messages: [] });

    res.json({ messages: convo.messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load history" });
  }
}
