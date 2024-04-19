import { useState, useEffect } from "react";
import Header from "./ChatboxPage/Header";
import InputBox from "./ChatboxPage/Input";
import { useNavigate } from "react-router-dom";

function EnterApiKeyPage() {
  console.log("rendered API key page");
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAPIKey = async () => {
      chrome.storage.local.get("geminiAPI", function (result) {
        let key = result.geminiAPI; 
        console.log("The current API key in use is: " + key); 
        if (key !== "") {
          setApiKey(key);
          navigate("/chatbot");
        }
      });
    };

    getAPIKey();
  }, []);

  const handleApiKeyChange = (event) => {
    chrome.storage.local.set({ 'geminiAPI': event.target.value });
    setApiKey(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate("/chatbot");
  };

  return (
    <div class="min-w-64 min-h-96 flex flex-col h-screen text-center justify-between relative bg-zinc-900">
      <Header />
      <InputBox
        apiKey={apiKey}
        handleFormSubmit={handleFormSubmit}
        handleApiKeyChange={handleApiKeyChange}
      />
    </div>
  );
}

export default EnterApiKeyPage;
