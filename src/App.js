import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading whoishiring submissions...");

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/user/whoishiring.json?print=pretty')
      .then(response => response.json())
      .then(data => {
        setLoadingMessage("Done");
        console.log(data)
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{loadingMessage}</p>
      </header>
    </div>
  );
}

export default App;
