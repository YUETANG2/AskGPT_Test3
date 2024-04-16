import { useState } from "react";
import Header from "./ChatboxPage/Header";
import InputBox from "./ChatboxPage/Input";
import { useNavigate } from "react-router-dom";

function EnterApiKeyPage() {
  console.log("rendered API key page");
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("apiKey", apiKey);
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
