import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('sidebar-root'));
console.log("side", document.getElementById('sidebar-root'));
console.log(root);
root.render(
  <React.StrictMode>
    <>This is side panel</>
  </React.StrictMode>
);
    