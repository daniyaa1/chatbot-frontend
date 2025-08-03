import React from "react";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1
        style={{
          color: "white",
          marginBottom: "50px",
          letterSpacing: "1px",
          textShadow: "0 0 8px rgba(255,255,255,0.3)"
        }}
      >
        Ementora AI 🤖
      </h1>

      <ChatWidget />
    </div>
  );
}

export default App;


