import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading whoishiring submissions list...");

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/user/whoishiring.json')
      .then(response => response.json())
      .then(data => {
        setLoadingMessage("Loading whoishiring submissions...");
        let responses = data.submitted.slice(0, 9)
          .map(submissionId => fetch('https://hacker-news.firebaseio.com/v0/item/' + submissionId + '.json'));
        Promise.all(responses)
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(responses => console.log(responses))
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
