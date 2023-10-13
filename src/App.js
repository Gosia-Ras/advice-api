import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const url = "https://api.adviceslip.com/advice";
  const [advice, setAdvice] = useState(null);

  const fetchAdvice = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdvice(data?.slip?.advice ?? "No advice available"));
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="App">
      <p>{advice}</p>
      <button onClick={fetchAdvice}>Retrieve Advice</button>
    </div>
  );
}

export default App;
