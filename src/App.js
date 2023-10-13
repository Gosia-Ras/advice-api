import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const url = "https://api.adviceslip.com/advice";
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdvice(data?.slip?.advice ?? "No advice available"));
  }, []);

  return (
    <div className="App">
      <p>{advice}</p>
    </div>
  );
}

export default App;
