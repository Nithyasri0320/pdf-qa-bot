import { useState, useRef, useEffect } from "react";

const COLORS = {
  bg: "#0F0F13",
  surface: "#16161D",
  card: "#1C1C26",
  border: "#2A2A38",
  accent: "#7C6FFF",
  accentGlow: "#7C6FFF33",
  accentSoft: "#A99FFF",
  text: "#E8E8F0",
  textMuted: "#7A7A9A",
  textDim: "#4A4A6A",
  userBubble: "#1E1B3A",
  aiBubble: "#181824",
  success: "#4FFFB0",
  successDim: "#4FFFB022",
};

const styles = {
  root: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
  },
  header: {
    width: "100%",
    background: `${COLORS.surface}CC`,
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    boxSizing: "border-box",
  },
  logo: {
    width: 36,
    height: 36,
    background: `linear-gradient(135deg, ${COLORS.accent}, #B06FFF)`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "-0.3px",
    color: COLORS.text,
  },
  headerSub: {
    fontSize: "12px",
    color: COLORS.textMuted,
    marginTop: "1px",
  },
  pdfBadge: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "13px",
    color: COLORS.textMuted,
    maxWidth: "220px",
    overflow: "hidden",
  },
  pdfBadgeName: {
    color: COLORS.accentSoft,
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "140px",
  },
  mainWrapper: {
    width: "100%",
    maxWidth: "760px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "0 16px",
    boxSizing: "border-box",
  },
  uploadZone: {
    margin: "48px auto",
    width: "100%",
    maxWidth: "520px",
    background: COLORS.card,
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "20px",
    padding: "52px 32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  uploadZoneActive: {
    border: `2px dashed ${COLORS.accent}`,
    background: COLORS.accentGlow,
  },
  uploadIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    display: "block",
    filter: "grayscale(0.3)",
  },
  uploadTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "8px",
    color: COLORS.text,
  },
  uploadSub: {
    fontSize: "14px",
    color: COLORS.textMuted,
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  uploadBtn: {
    display: "inline-block",
    background: `linear-gradient(135deg, ${COLORS.accent}, #9B6FFF)`,
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    padding: "10px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    letterSpacing: "0.2px",
  },
  uploadSmall: {
    marginTop: "14px",
    fontSize: "12px",
    color: COLORS.textDim,
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emptyState: {
    marginTop: "40px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "40px",
    marginBottom: "12px",
    display: "block",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: "6px",
  },
  emptySub: {
    fontSize: "13px",
    color: COLORS.textMuted,
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  suggestionGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  suggestionChip: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "10px",
    padding: "8px 16px",
    fontSize: "13px",
    color: COLORS.textMuted,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  msgRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  msgLabel: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: COLORS.textDim,
    marginLeft: "4px",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: COLORS.userBubble,
    border: `1px solid ${COLORS.accent}44`,
    borderRadius: "14px 14px 4px 14px",
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: "1.6",
    maxWidth: "80%",
    color: COLORS.text,
  },
  aiMsg: {
    alignSelf: "flex-start",
    background: COLORS.aiBubble,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px 14px 14px 4px",
    padding: "14px 18px",
    fontSize: "14px",
    lineHeight: "1.7",
    maxWidth: "90%",
    color: COLORS.text,
    whiteSpace: "pre-wrap",
  },
  loadingDots: {
    display: "flex",
    gap: "5px",
    padding: "6px 4px",
  },
  dot: {
    width: "7px",
    height: "7px",
    background: COLORS.accent,
    borderRadius: "50%",
    opacity: 0.6,
  },
  inputBar: {
    width: "100%",
    maxWidth: "760px",
    padding: "16px",
    boxSizing: "border-box",
    background: COLORS.bg,
    borderTop: `1px solid ${COLORS.border}`,
    position: "sticky",
    bottom: 0,
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px",
    padding: "8px 12px",
    alignItems: "flex-end",
    transition: "border-color 0.2s",
  },
  textarea: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    color: COLORS.text,
    lineHeight: "1.5",
    padding: "6px 4px",
    fontFamily: "inherit",
    minHeight: "24px",
    maxHeight: "120px",
    overflowY: "auto",
  },
  sendBtn: {
    background: `linear-gradient(135deg, ${COLORS.accent}, #9B6FFF)`,
    border: "none",
    borderRadius: "10px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "opacity 0.15s",
    fontSize: "16px",
  },
  sendBtnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  processingBanner: {
    background: COLORS.successDim,
    border: `1px solid ${COLORS.success}44`,
    borderRadius: "10px",
    padding: "10px 16px",
    fontSize: "13px",
    color: COLORS.success,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
  },
  clearBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "7px",
    padding: "4px 10px",
    fontSize: "12px",
    color: COLORS.textMuted,
    cursor: "pointer",
    transition: "all 0.15s",
  },
};

function LoadingDots() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % 3), 400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={styles.loadingDots}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            ...styles.dot,
            opacity: frame === i ? 1 : 0.25,
            transform: frame === i ? "scale(1.3)" : "scale(1)",
            transition: "all 0.2s",
          }}
        />
      ))}
    </div>
  );
}

const SUGGESTIONS = [
  "📋 Summarize this document",
  "🔑 What are the key points?",
  "❓ What is this document about?",
  "📊 List the main topics covered",
];

export default function PDFQABot() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleFile = (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setProcessing(true);
    setPdfFile(file);
    setMessages([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(",")[1];
      setPdfBase64(base64);
      setTimeout(() => setProcessing(false), 800);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const askQuestion = async (question) => {
    if (!question.trim() || !pdfBase64 || loading) return;
    const userMsg = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) =>
        m.role === "user"
          ? { role: "user", content: m.text }
          : { role: "assistant", content: m.text }
      );

      const pdfContent = {
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: pdfBase64,
        },
      };

      const allMessages = [
        ...history,
        {
          role: "user",
          content: [
            pdfContent,
            { type: "text", text: userMsg },
          ],
        },
      ];

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system:
            "You are a helpful PDF assistant. Answer questions clearly and concisely based on the document provided. If something isn't in the document, say so. Use bullet points or numbered lists when helpful. Be direct and informative.",
          messages: allMessages,
        }),
      });

      const data = await res.json();
      const aiText =
        data?.content?.map((b) => b.text || "").join("") ||
        "Sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion(input);
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  if (!pdfFile) {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div style={styles.logo}>📄</div>
          <div>
            <div style={styles.headerTitle}>PDF Q&A Bot</div>
            <div style={styles.headerSub}>Ask anything about your document</div>
          </div>
        </div>
        <div style={styles.mainWrapper}>
          <div
            style={{
              ...styles.uploadZone,
              ...(dragging ? styles.uploadZoneActive : {}),
              margin: "auto",
              marginTop: "64px",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <span style={styles.uploadIcon}>📑</span>
            <div style={styles.uploadTitle}>Drop your PDF here</div>
            <div style={styles.uploadSub}>
              Upload any PDF — reports, papers, books, manuals — and start asking questions instantly.
            </div>
            <button style={styles.uploadBtn}>Choose PDF file</button>
            <div style={styles.uploadSmall}>PDF files only · No size limit</div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.root, height: "100vh" }}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>📄</div>
        <div>
          <div style={styles.headerTitle}>PDF Q&A Bot</div>
          <div style={styles.headerSub}>Ask anything about your document</div>
        </div>
        <div style={styles.pdfBadge}>
          <span>📎</span>
          <span style={styles.pdfBadgeName}>{pdfFile.name}</span>
        </div>
      </div>

      {/* Chat */}
      <div style={{ ...styles.mainWrapper, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {processing && (
          <div style={styles.processingBanner}>
            <span>✅</span>
            <span>PDF loaded — ready to answer questions!</span>
            <button
              style={styles.clearBtn}
              onClick={() => { setPdfFile(null); setPdfBase64(null); setMessages([]); }}
            >
              Change PDF
            </button>
          </div>
        )}

        <div ref={chatRef} style={styles.chatArea}>
          {messages.length === 0 && !loading && (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>💬</span>
              <div style={styles.emptyTitle}>Start asking questions</div>
              <div style={styles.emptySub}>
                Your PDF is ready. Ask anything — I'll find the answers for you.
              </div>
              <div style={styles.suggestionGrid}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    style={styles.suggestionChip}
                    onClick={() => askQuestion(s.split(" ").slice(1).join(" "))}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = COLORS.accent;
                      e.target.style.color = COLORS.accentSoft;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = COLORS.border;
                      e.target.style.color = COLORS.textMuted;
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={styles.msgRow}>
              <div
                style={{
                  ...styles.msgLabel,
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {m.role === "user" ? "You" : "AI"}
              </div>
              <div style={m.role === "user" ? styles.userMsg : styles.aiMsg}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={styles.msgRow}>
              <div style={styles.msgLabel}>AI</div>
              <div style={styles.aiMsg}>
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div style={{ ...styles.inputBar, width: "100%", maxWidth: "760px" }}>
        <div style={styles.inputRow}>
          <textarea
            ref={textareaRef}
            style={styles.textarea}
            placeholder="Ask a question about your PDF..."
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            style={{
              ...styles.sendBtn,
              ...((!input.trim() || loading) ? styles.sendBtnDisabled : {}),
            }}
            onClick={() => askQuestion(input)}
            disabled={!input.trim() || loading}
          >
            ↑
          </button>
        </div>
        <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: COLORS.textDim }}>
            Enter to send · Shift+Enter for new line
          </span>
          {messages.length > 0 && (
            <button
              style={styles.clearBtn}
              onClick={() => { setPdfFile(null); setPdfBase64(null); setMessages([]); }}
              onMouseEnter={(e) => { e.target.style.color = COLORS.text; }}
              onMouseLeave={(e) => { e.target.style.color = COLORS.textMuted; }}
            >
              📎 Change PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
