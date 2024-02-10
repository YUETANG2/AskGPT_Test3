import React, { useState, useEffect } from "react";
import run from "./api/geminiAPI";

function App() {
  const [input, setInput] = useState("");

  const placeholderMsg = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          recusandae quis ab. Dolorem blanditiis inventore vitae veritatis cum
          maxime ad alias assumenda autem, tempora, modi corporis, sunt
          voluptatem enim in!`;

  const [conversation, setConversation] = useState([
    placeholderMsg,
    placeholderMsg,
    placeholderMsg,
    placeholderMsg,
  ]);

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
    setConversation(() => [...conversation, input]);
    setInput("");
    const response = await run(input);
    console.log(response);
    setConversation(() => [...conversation, input, response]);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="min-w-64 min-h-96 flex flex-col h-screen text-center justify-between">
      {/* Top */}
      <h1 className="text-2xl font-bold bg-yellow-400 p-4">Ask chatGPT</h1>

      <div className="flex flex-grow flex-col gap-4 p-4 overflow-auto">
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

      {/* Bottom */}
      <div className="flex bg-yellow-400">
        <textarea
          className="border border-black w-3/4"
          placeholder="Selecting text or start typing..."
          value={input}
          onChange={handleInputChange}
        />
        <button className="text-lg text-center" onClick={askGPT}>Ask GPT!</button>
      </div>
    </div>
  );
}

export default App;
