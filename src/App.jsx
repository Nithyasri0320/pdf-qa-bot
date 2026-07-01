import { useState, useRef, useEffect } from "react";

const SEARCH_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const GLOBE_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const SEND_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>
  </svg>
);

const LINK_ICON = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const CLEAR_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const SUGGESTIONS = [
  "What's happening in AI today?",
  "Latest stock market news",
  "Top tech launches this week",
  "Recent cricket match results",
  "Trending topics on the internet",
];

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: "4px", alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#6366f1",
          display: "inline-block",
          animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`
        }} />
      ))}
    </span>
  );
}

function SourceBadge({ url }) {
  let domain = "";
  try { domain = new URL(url).hostname.replace("www.", ""); } catch { domain = url; }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
      borderRadius: 20, padding: "2px 10px", fontSize: 11,
      color: "#a5b4fc", textDecoration: "none", transition: "all 0.2s",
      cursor: "pointer", whiteSpace: "nowrap",
    }}
    onMouseOver={e => { e.currentTarget.style.background = "rgba(99,102,241,0.22)"; e.currentTarget.style.color = "#c7d2fe"; }}
    onMouseOut={e => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.color = "#a5b4fc"; }}
    >
      {LINK_ICON} {domain}
    </a>
  );
}

function SearchingIndicator({ query }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 10, padding: "6px 14px", fontSize: 12, color: "#a5b4fc",
      animation: "fadeIn 0.3s ease",
    }}>
      <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>{GLOBE_ICON}</span>
      Searching web{query ? `: "${query}"` : "…"}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", flexDirection: isUser ? "row-reverse" : "row",
      gap: 12, alignItems: "flex-start", animation: "fadeSlideIn 0.35s ease",
    }}>
      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 700,
        background: isUser
          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
          : "linear-gradient(135deg,#1e1e2e,#2d2d44)",
        border: isUser ? "none" : "1.5px solid rgba(99,102,241,0.4)",
        color: isUser ? "#fff" : "#a5b4fc",
        boxShadow: isUser ? "0 2px 12px rgba(99,102,241,0.35)" : "none",
      }}>
        {isUser ? "N" : "✦"}
      </div>

      <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Search indicators */}
        {msg.searchingQueries?.map((q, i) => (
          <SearchingIndicator key={i} query={q} />
        ))}

        {/* Bubble */}
        {(msg.text || msg.typing) && (
          <div style={{
            background: isUser
              ? "linear-gradient(135deg,#6366f1,#7c3aed)"
              : "rgba(255,255,255,0.04)",
            border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
            padding: "12px 16px",
            color: isUser ? "#fff" : "#e2e8f0",
            fontSize: 14,
            lineHeight: 1.65,
            boxShadow: isUser
              ? "0 4px 16px rgba(99,102,241,0.3)"
              : "0 1px 4px rgba(0,0,0,0.2)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>
            {msg.typing ? <TypingDots /> : msg.text}
          </div>
        )}

        {/* Sources */}
        {msg.sources?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 4 }}>
            <span style={{ fontSize: 11, color: "#64748b", alignSelf: "center" }}>Sources:</span>
            {msg.sources.map((s, i) => <SourceBadge key={i} url={s} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebSearchAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const query = text || input.trim();
    if (!query || loading) return;
    setInput("");

    const userMsg = { role: "user", text: query };
    const thinkingMsg = { role: "assistant", typing: true, searchingQueries: [], sources: [] };

    setMessages(prev => [...prev, userMsg, thinkingMsg]);
    setLoading(true);

    const newHistory = [...history, { role: "user", content: query }];

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-calls": "true", },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are a real-time web intelligence agent. When asked questions:
- ALWAYS use the web_search tool to fetch current, live information
- Provide accurate, up-to-date answers based on what you find
- Be concise but comprehensive — use bullet points for lists
- If asked about news, events, scores, prices, or any time-sensitive data, always search first
- Today's date is ${new Date().toDateString()}
- Keep answers clear and well-structured`,
          messages: newHistory,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
        }),
      });

      const data = await response.json();

      // Extract search queries and answer
      let answerText = "";
      const searchQueries = [];
      const sources = [];

      // First pass: find tool use (searches)
      for (const block of data.content || []) {
        if (block.type === "tool_use" && block.name === "web_search") {
          searchQueries.push(block.input?.query || "");
        }
      }

      // Show searching state
      if (searchQueries.length > 0) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], searchingQueries: searchQueries };
          return updated;
        });
        await new Promise(r => setTimeout(r, 600));
      }

      // If there's tool use, we need to continue the conversation
      if (data.stop_reason === "tool_use") {
        const toolResults = [];
        for (const block of data.content) {
          if (block.type === "tool_use") {
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: "Search completed. Please provide your answer based on web search results.",
            });
          }
        }

        // Second API call with tool results
        const continueResponse = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-calls": "true", },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            system: `You are a real-time web intelligence agent. You have just performed web searches. 
Provide a clear, well-structured answer based on the latest web data.
Today's date is ${new Date().toDateString()}.
Use bullet points for lists, be concise but thorough.`,
            messages: [
              ...newHistory,
              { role: "assistant", content: data.content },
              { role: "user", content: toolResults },
            ],
            tools: [{ type: "web_search_20250305", name: "web_search" }],
          }),
        });

        const continueData = await continueResponse.json();

        for (const block of continueData.content || []) {
          if (block.type === "text") answerText += block.text;
        }

        // Extract sources from tool use inputs
        for (const block of data.content || []) {
          if (block.type === "tool_use" && block.name === "web_search") {
            const q = encodeURIComponent(block.input?.query || "");
            sources.push(`https://www.google.com/search?q=${q}`);
          }
        }

        setHistory([...newHistory, { role: "assistant", content: answerText }]);
      } else {
        // Direct answer without tool use
        for (const block of data.content || []) {
          if (block.type === "text") answerText += block.text;
        }
        setHistory([...newHistory, { role: "assistant", content: answerText }]);
      }

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          text: answerText || "I couldn't find relevant information. Try rephrasing your question.",
          sources,
          searchingQueries: [],
        };
        return updated;
      });

    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          text: "⚠️ Something went wrong. Please try again.",
          sources: [],
          searchingQueries: [],
        };
        return updated;
      });
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  function clearChat() {
    setMessages([]);
    setHistory([]);
    setInput("");
  }

  const isEmpty = messages.length === 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0a0a14 0%,#0d0d1a 50%,#0a0f1a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "'Inter','Segoe UI',sans-serif",
      color: "#e2e8f0",
    }}>
      <style>{`
        @keyframes typingBounce {
          0%,80%,100%{transform:translateY(0)}
          40%{transform:translateY(-6px)}
        }
        @keyframes spin {
          from{transform:rotate(0deg)}to{transform:rotate(360deg)}
        }
        @keyframes fadeIn {
          from{opacity:0}to{opacity:1}
        }
        @keyframes fadeSlideIn {
          from{opacity:0;transform:translateY(12px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes pulse {
          0%,100%{opacity:1}50%{opacity:0.5}
        }
        textarea:focus{outline:none}
        textarea::placeholder{color:#475569}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#2d2d44;border-radius:4px}
        .chip:hover{background:rgba(99,102,241,0.15)!important;border-color:rgba(99,102,241,0.4)!important;color:#c7d2fe!important}
      `}</style>

      {/* Header */}
      <div style={{
        width: "100%", maxWidth: 760,
        padding: "20px 20px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
          }}>🌐</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>WebAgent</div>
            <div style={{
              fontSize: 11, color: "#6366f1", display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{
                width: 6, height: 6, background: "#22c55e", borderRadius: "50%",
                display: "inline-block", animation: "pulse 2s ease-in-out infinite",
              }} />
              Live web access
            </div>
          </div>
        </div>
        {!isEmpty && (
          <button onClick={clearChat} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: "6px 12px", color: "#64748b",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, transition: "all 0.2s",
          }}
          onMouseOver={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseOut={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            {CLEAR_ICON} Clear
          </button>
        )}
      </div>

      {/* Main area */}
      <div style={{
        flex: 1, width: "100%", maxWidth: 760,
        padding: "0 20px",
        display: "flex", flexDirection: "column",
      }}>
        {isEmpty ? (
          /* Welcome screen */
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            paddingTop: 60, paddingBottom: 20,
            animation: "fadeIn 0.5s ease",
          }}>
            <div style={{
              fontSize: 52, marginBottom: 16,
              filter: "drop-shadow(0 0 30px rgba(99,102,241,0.5))",
            }}>🌐</div>
            <h1 style={{
              fontSize: 28, fontWeight: 800, margin: "0 0 10px",
              background: "linear-gradient(135deg,#e2e8f0,#a5b4fc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textAlign: "center", letterSpacing: "-0.03em",
            }}>
              Real-Time Web Agent
            </h1>
            <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 36px", textAlign: "center" }}>
              Ask anything — I'll search the web live and answer with fresh data.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 520 }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="chip" onClick={() => sendMessage(s)} style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: 20, padding: "7px 14px",
                  color: "#94a3b8", fontSize: 12,
                  cursor: "pointer", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {SEARCH_ICON} {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat messages */
          <div style={{
            flex: 1, overflowY: "auto", paddingTop: 24, paddingBottom: 16,
            display: "flex", flexDirection: "column", gap: 20,
          }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input area */}
        <div style={{ paddingBottom: 24, paddingTop: 12 }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: `1.5px solid ${loading ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 16, padding: "12px 16px",
            display: "flex", alignItems: "flex-end", gap: 12,
            boxShadow: loading ? "0 0 24px rgba(99,102,241,0.15)" : "0 4px 24px rgba(0,0,0,0.3)",
            transition: "all 0.3s",
          }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#4a5568", flexShrink: 0 }}>{SEARCH_ICON}</span>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything — news, scores, prices, events…"
                rows={1}
                disabled={loading}
                style={{
                  flex: 1, background: "transparent", border: "none",
                  color: "#e2e8f0", fontSize: 14, resize: "none",
                  lineHeight: 1.5, maxHeight: 120, overflowY: "auto",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: loading || !input.trim()
                  ? "rgba(99,102,241,0.2)"
                  : "linear-gradient(135deg,#6366f1,#7c3aed)",
                border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: loading || !input.trim() ? "#4a5568" : "#fff",
                transition: "all 0.2s",
                boxShadow: !loading && input.trim() ? "0 4px 12px rgba(99,102,241,0.4)" : "none",
              }}
            >
              {SEND_ICON}
            </button>
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 8 }}>
            Press Enter to search · Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}
