import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterApiKeyPage() {
  console.log("rendered API key page")
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('apiKey', apiKey);
    navigate('/chatbot');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Enter your API key"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EnterApiKeyPage;
