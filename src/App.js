import React, { useState } from 'react';
import './App.css';

function App() {

  const [loadingMessage] = useState("Loading...");

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {loadingMessage}
        </p>
      </header>
    </div>
  );
}

export default App;
