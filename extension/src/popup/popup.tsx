import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{}> = () => {
  function handleHideButton() {
    chrome.runtime.sendMessage({ message: 'hideButton' });
  }

  function handleUNotificationButton() {
    chrome.runtime.sendMessage({ message: 'sendNotification' });
  }

  return (
    <div>
      <button onClick={handleHideButton}>hide</button>
      <button onClick={handleUNotificationButton}>noti</button>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
