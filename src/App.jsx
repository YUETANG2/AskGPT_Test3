import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EnterApiKeyPage from './Components/EnterApiKeyPage';
import ChatbotPage from './Components/ChatbotPage';

function App() {
  const apiKey = localStorage.getItem('apiKey');

  return (
    <Routes>
      <Route exact path="/" element={<EnterApiKeyPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      {/* Navigate to the */}
      <Route path="*" element={<Navigate to="/" />} />
      {/* TODO: After we added the button on the Chatbot page to navigate back to the home page. We can automatically redirect the uer to the chatbot page if they inputted the apikey*/}
      {/* <Route path="/" element={apiKey ? <Navigate to="/chatbot" /> : <Navigate to="/enter-api-key" />} /> */}
    </Routes>
  );
}

export default App;