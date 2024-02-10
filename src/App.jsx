import React, { useState, useEffect } from "react";
import run from "./api/geminiAPI";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.text) {
        console.log("Received text from content script:", message.text);
        setInput(message.text);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup listener on component unmount
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const askGPT = async () => {
    const response = await run(input);
    console.log(response);
    setOutput(response);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="min-w-64 min-h-96 flex flex-col h-screen text-center justify-between">
      {/* Top */}
      <h1 className="text-4xl font-bold bg-yellow-400 p-4">
        Ask chatGPT
      </h1>

      <div className="flex flex-grow flex-col gap-4 p-4 overflow-auto">
        <div className="w-3/4 text-left mx-auto mr-0 bg-green-200 p-4 rounded-[40px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          recusandae quis ab. Dolorem blanditiis inventore vitae veritatis cum
          maxime ad alias assumenda autem, tempora, modi corporis, sunt
          voluptatem enim in!
        </div>
        <div className="w-3/4 text-left mx-auto ml-0 bg-red-200 p-4 rounded-[40px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          recusandae quis ab. Dolorem blanditiis inventore vitae veritatis cum
          maxime ad alias assumenda autem, tempora, modi corporis, sunt
          voluptatem enim in!
        </div>
        <div className="w-3/4 text-left mx-auto mr-0 bg-green-200 p-4 rounded-[40px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          recusandae quis ab. Dolorem blanditiis inventore vitae veritatis cum
          maxime ad alias assumenda autem, tempora, modi corporis, sunt
          voluptatem enim in!
        </div>
        <div className="w-3/4 text-left mx-auto ml-0 bg-red-200 p-4 rounded-[40px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
          recusandae quis ab. Dolorem blanditiis inventore vitae veritatis cum
          maxime ad alias assumenda autem, tempora, modi corporis, sunt
          voluptatem enim in!
        </div>
      </div>

      {/* Bottom */}
      <div className="flex bg-yellow-400">
        <textarea
          className="border border-black w-3/4"
          placeholder="Selecting text or start typing..."
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={askGPT}>Ask GPT!</button>
      </div>
    </div>
  );
}

export default App;
