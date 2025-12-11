// client/src/components/Chat.jsx
import React, { useEffect, useRef, useState } from "react";

function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`max-w-[75%] px-4 py-2 rounded-lg ${isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
        {text}
      </div>
    </div>
  );
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are Knowvy AI Assistant. Be concise and helpful." }
  ]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  // fetch history on mount (protected endpoint)
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("http://localhost:5000/api/ai/history", {
          credentials: "include",
          headers: {
            // send Authorization header if using auth; else remove
            // "Authorization": `Bearer ${yourToken}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length) {
            setMessages(data.messages);
          }
        }
      } catch (e) {
        // ignore
      }
    }
    fetchHistory();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStreaming(true);

    // create assistant placeholder
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("http://localhost:5000/api/ai/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` // include if needed
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const txt = await res.text();
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: `Error: ${txt}` };
          return copy;
        });
        setLoading(false);
        setStreaming(false);
        return;
      }

      // Read SSE-like body: parse incoming `data: {"text":"..."}\n\n` events
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // split by double newline, each part may be 'data: {...}'
        const parts = chunk.split(/\n\n/).filter(Boolean);
        for (const part of parts) {
          if (part.includes("data:")) {
            const m = part.match(/data:\s*(.*)/s);
            if (!m) continue;
            try {
              const payload = JSON.parse(m[1]);
              if (payload.text) {
                assistantText += payload.text;
                setMessages(prev => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: assistantText };
                  return copy;
                });
              }
            } catch (err) {
              // ignore parse errors
            }
          } else if (part.includes("event: done")) {
            // done signal
          }
        }
      }

      setStreaming(false);
      setLoading(false);
    } catch (err) {
      console.error("stream error", err);
      setMessages(prev => {
        const m = [...prev];
        m[m.length - 1] = { role: "assistant", content: "Error: streaming failed" };
        return m;
      });
      setStreaming(false);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white">
      <div className="container mx-auto p-4 flex-1 flex flex-col">
        <div className="bg-neutral-950 rounded-lg p-4 flex-1 overflow-auto" ref={messagesRef} style={{ minHeight: 0 }}>
          {messages.filter(m => m.role !== "system").map((m, idx) => (
            <ChatBubble key={idx} role={m.role} text={m.content} />
          ))}

          {streaming && (
            <div className="flex justify-start my-2">
              <div className="bg-gray-800 px-3 py-2 rounded-lg">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 p-3 rounded-lg bg-neutral-800 text-white outline-none"
              placeholder="Ask Knowvy assistant..."
            />
            <button
              onClick={handleSend}
              className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {loading ? "Generating..." : "Press Enter to send. Streaming enabled."}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
    </div>
  );
}
