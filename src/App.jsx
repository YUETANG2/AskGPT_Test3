import React, { useState, useEffect, useRef } from "react";
import run from "./api/geminiAPI";

function App() {
  const [input, setInput] = useState("");
  const conversationRef = useRef(null);
  // Other state and effects remain unchanged

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      console.log("Received text from content script:", message.text);
      setInput(message.text);
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup listener on component unmount
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      console.log("Received text from content script:", message.text);
      setInput(message.text);
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup listener on component unmount
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const askGPT = async () => {
    setInput("");
    setConversation((prev) => [...prev, input]);
    const response = await run(input);
    setConversation((prev) => [...prev, response]);
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

      <div
        className="flex flex-grow flex-col gap-4 p-4 overflow-auto"
        ref={conversationRef}
      >
        {/* Conversation messages */}
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`w-3/4 text-left mx-auto p-4 rounded-[40px] ${
              index % 2 === 1 ? "bg-red-200 ml-0" : "bg-green-200 mr-0"
            }`}
          >
            {message}
          </div>
        ))}
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
