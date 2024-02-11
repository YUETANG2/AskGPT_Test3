import React, { useState, useEffect, useRef } from "react";
import run from "./api/geminiAPI";

function App() {
  const [input, setInput] = useState("");
  const conversationRef = useRef(null);
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
    // Scrolling to the bottom of the conversation container
    const current = conversationRef.current;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  }, [conversation]); // This effect depends on `conversation`

  const askGPT = async () => {
    const userInput = input.trim(); // Trim input to remove leading/trailing whitespace
    if (!userInput) return; // Prevent sending empty messages
    setInput(""); // Clear the input field immediately for a better user experience

    // Update the conversation with the user's input immediately,
    // so it shows up right away in the chat.
    setConversation(prev => [...prev, userInput]);

    try {
      const response = await run(userInput);
      console.log(response);

      // Once the response is received, append it to the conversation.
      // This updates the conversation a second time with the responder's reply.
      setConversation(prev => [...prev, response]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Handle the error state appropriately, maybe show an error message in the UI.
    }
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
            className={`w-3/4 p-4 rounded-[40px] ${
              index % 2 === 0 ? "bg-green-200 self-end" : "bg-red-200 self-start"
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

