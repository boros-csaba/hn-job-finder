import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [isLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading whoishiring submissions list...');

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/user/whoishiring.json')
      .then(response => response.json())
      .then(data => {
        setLoadingMessage('Loading whoishiring submissions...');
        let responses = data.submitted.slice(0, 9)
          .map(submissionId => fetch('https://hacker-news.firebaseio.com/v0/item/' + submissionId + '.json'));
        Promise.all(responses)
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(submissions => {
            let postIds = submissions.flatMap(item => item.kids);
            const loadPosts = async (postIds) => {
              for (var i = 0; i < postIds.length; i++) {
                setLoadingMessage('Loading item ' + (i + 1) + ' of ' + postIds.length);
                let response = await fetch('https://hacker-news.firebaseio.com/v0/item/' + postIds[1] + '.json')
                  .then(response => response.json());
                console.log(response);
              }
            }
            loadPosts(postIds);
            
          })
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
