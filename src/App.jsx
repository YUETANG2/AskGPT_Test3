import run from "./api/geminiAPI";

function App() {
  run();

  return (
    <div className="App text-4xl font-bold">
      <h1>Hello extension from react</h1>
    </div>
  );
}

export default App;