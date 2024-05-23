import { useState, useEffect } from "react";
import Header from "./SharedComponents/Header";

import { useNavigate } from "react-router-dom";

function EnterApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAPIKey = async () => {
      chrome.storage.local.get("geminiAPI", function (result) {
        let key = result.geminiAPI;
        if (key !== "") {
          setApiKey(key);
          navigate("/chatbot");
        }
      });
    };

    getAPIKey();
  }, []);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (apiKey != "") {
      chrome.storage.local.set({ geminiAPI: apiKey });
      navigate("/chatbot");
    }
  };

  return (
    <div class="min-w-64 min-h-96 flex flex-col h-screen text-center justify-between relative bg-zinc-900">
      <Header />
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your API key"
          />
          <button class="text-gray-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterApiKeyPage;
