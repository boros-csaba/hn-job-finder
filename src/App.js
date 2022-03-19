import React, { useState, useEffect } from 'react';
import JobList from './components/job-list/job-list.component';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = useState(true);
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
            let postIds = submissions.flatMap(item => item.kids)
            const batchSize = 50;
            const allPromises = [];
            const loadPosts = async (postIds) => {
              for (var i = 0; i < postIds.length; i += batchSize) {
                setLoadingMessage('Loading item ' + (i + 1) + ' of ' + postIds.length);
                let responses = postIds.slice(i, i + batchSize + 1)
                  .filter(postId => localStorage.getItem(postId) == null)
                  .map(postId => fetch('https://hacker-news.firebaseio.com/v0/item/' + postId + '.json'));

                allPromises.push(responses);

                let posts = await Promise.all(responses)
                  .then(responses => Promise.all(responses.map(response => response.json())))
                posts.forEach(post => {
                  localStorage.setItem(post.id, JSON.stringify({
                    text: post.text,
                    time: post.time
                  }));
                });
              }

              Promise.all(allPromises)
                .then(() => {
                  setIsLoading(false)
                });
            }
            loadPosts(postIds);
          })
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <p>{loadingMessage}</p>}
        {!isLoading && <JobList />}
      </header>
    </div>
  );
}

export default App;
