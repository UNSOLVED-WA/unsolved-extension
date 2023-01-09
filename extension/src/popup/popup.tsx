import React from 'react';
import ReactDOM from 'react-dom';
import { MessageManager } from '../utils';

// TODO : <high> 자동 열기 제어 기능 추가
const App = () => {
  function handleHideButton() {
    MessageManager.send({ message: 'hideButton', type: 'sync' });
  }

  function handleUNotificationButton() {
    MessageManager.send({ message: 'sendNotification', type: 'sync' });
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
