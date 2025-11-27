import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Ementora AI. How can I help you?", time: new Date().toISOString() }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // sendMessage accepts optional text param (used by quick-replies)
  const sendMessage = async (text) => {
    const messageText = typeof text === "string" ? text : input;
    if (!messageText || !messageText.trim()) return;

    const userMessage = { sender: "user", text: messageText, time: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    if (typeof text !== "string") setInput("");
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://chatbot-backend-jtq7.onrender.com";
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) throw new Error("Server returned error");
      const data = await res.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply, time: new Date().toISOString() }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server not responding.", time: new Date().toISOString() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    "How do I join Ementora?",
    "Do you have a free plan?",
    "What is Ementora?"
  ];

  const handleQuickReply = (q) => sendMessage(q);

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading]);

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="header-content">
          <div className="emoji">🤖</div>
          <h2>Ementora AI</h2>
        </div>
      </div>

      <div className="messages">
        {/* Persistent welcome card with quick replies */}
        <div className="welcome-card">
          <div className="welcome-title">Welcome to Ementora AI</div>
          <div className="welcome-text">Ask a question or try a quick reply below</div>
          <div className="quick-replies">
            {quickReplies.map((q) => (
              <button key={q} className="quick-btn" onClick={() => handleQuickReply(q)}>{q}</button>
            ))}
          </div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.sender}`}>
            <div className={`avatar ${msg.sender}`}>{msg.sender === 'bot' ? '🤖' : '🧑'}</div>
            <div className={`msg ${msg.sender}`}>
              <div className="msg-text">{msg.text}</div>
              <div className="msg-time">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="msg-row bot">
            <div className="avatar bot">🤖</div>
            <div className="msg bot typing">
              <div className="dots"><span></span><span></span><span></span></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
        />
        <button onClick={sendMessage} disabled={isLoading}>{isLoading ? "Sending..." : "Send"}</button>
      </div>
    </div>
  );
}

