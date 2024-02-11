import React, { useState, useEffect, useRef } from "react";
import run from "./api/geminiAPI";

function App() {
  const [input, setInput] = useState("");
  const conversationRef = useRef(null);
  // Other state and effects remain unchanged

  const askGPT = async () => {
    const userInput = input;
    setInput("");
    setConversation(prev => [...prev, userInput]);
    const response = await run(userInput);
    setConversation(prev => [...prev, response]);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default to avoid newline
      askGPT();
    }
  };

  return (
    <div className="min-w-64 min-h-96 flex flex-col h-screen text-center justify-between">
      <h1 className="text-2xl font-bold bg-yellow-400 p-4">Ask Genie</h1>

      <div className="flex flex-grow flex-col gap-4 p-4 overflow-auto" ref={conversationRef}>
        {/* Conversation messages */}
      </div>

      <div className="flex bg-yellow-400">
        <textarea
          className="border border-black w-3/4"
          placeholder="Selecting text or start typing..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="text-lg text-center mx-auto p-6" onClick={askGPT}>
          Ask Genie!
        </button>
      </div>
    </div>
  );
}

export default App;
