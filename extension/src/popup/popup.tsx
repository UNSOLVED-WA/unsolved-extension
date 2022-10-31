import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// TODO : contentscript가 동작할 domain 추가, 삭제 기능 필요
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
