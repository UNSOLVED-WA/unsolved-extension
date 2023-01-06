import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '../utils/message';

// TODO : <high> 자동 열기 제어 기능 추가
const App = () => {
  function handleHideButton() {
    Message.send({ message: 'hideButton', type: 'sync' });
  }

  function handleUNotificationButton() {
    Message.send({ message: 'sendNotification', type: 'sync' });
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
