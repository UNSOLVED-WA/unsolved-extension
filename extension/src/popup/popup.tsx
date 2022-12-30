import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '../utils/message';

// TODO : contentscript가 동작할 domain 추가, 삭제 기능 필요
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
