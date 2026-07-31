import React, { useState, useEffect, useRef } from "react";
import { askGroq } from "../services/groq";
import "./AI_Assistant.css";

const AI_AssistantPages = ({ tasks, focusSessions }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm your LifeQuest Assistant. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, isTyping]);

  const handleSend = async (customMessage = "") => {
    const userMessage = customMessage || message;

    if (userMessage.trim() === "") return;

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    if (!customMessage) {
      setMessage("");
    }

    const text = userMessage.toLowerCase();

    const conversationHistory = chat
      .slice(-10)
      .map(
        (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`,
      )
      .join("\n");

    // ==========================
    // App Data
    // ==========================

    const completedTasks = tasks.filter((task) => task.completed).length;

    const pendingTasks = tasks.filter((task) => !task.completed).length;

    const totalFocusTime = focusSessions.reduce(
      (sum, session) => sum + session.duration,
      0,
    );

    let aiReply = "";

    // ==========================
    // Local Commands
    // ==========================

    if (text.includes("pending")) {
      aiReply = `📋 You have ${pendingTasks} pending task(s).`;
    } else if (text.includes("completed")) {
      aiReply = `✅ You have completed ${completedTasks} task(s).`;
    } else if (text.includes("focus")) {
      aiReply = `🎯 You completed ${focusSessions.length} focus session(s) with a total focus time of ${totalFocusTime} minutes.`;
    } else if (text.includes("hello") || text.includes("hi")) {
      aiReply = "👋 Hello! Ready to boost your productivity?";
    } else if (text.includes("motivate")) {
      aiReply =
        "🔥 Success comes from consistency. Complete one task at a time!";
    } else {
      setIsTyping(true);

      try {
const appContext = `
You are LifeQuest AI, a smart productivity assistant.

User Productivity Data

Total Tasks: ${tasks.length}
Completed Tasks: ${completedTasks}
Pending Tasks: ${pendingTasks}
Focus Sessions: ${focusSessions.length}
Total Focus Time: ${totalFocusTime} minutes

Pending Tasks:
${tasks
  .filter(task => !task.completed)
  .map(task => "- " + task.title)
  .join("\n")}

Conversation History:
${conversationHistory}

Current User Question:
${userMessage}

Rules:
- Reply in a friendly tone.
- Use markdown when useful.
- Recommend pending tasks when asked.
- Remember previous conversation.
- Keep answers concise unless asked for details.
`;
        aiReply = await askGroq(appContext);
      } catch (error) {
        console.error(error);

        aiReply = "❌ AI is unavailable.";
      }

      setIsTyping(false);
    }

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    }, 500);
  };

  const quickPrompts = [
    "Pending tasks",
    "Completed tasks",
    "Focus time",
    "Motivate me",
    "Hello",
  ];

  return (
    <div className="ai-page">
      <h1>AI Assistant</h1>

      <div className="quick-prompts">
        {quickPrompts.map((prompt, index) => (
          <button key={index} onClick={() => handleSend(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>

            {msg.sender === "ai" && (
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(msg.text);
                }}
              >
                📋
              </button>
            )}
          </div>
        ))}

        {isTyping && <div className="typing">🤖 LifeQuest AI is typing...</div>}

        <div ref={chatEndRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default AI_AssistantPages;
