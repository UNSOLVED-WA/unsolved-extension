import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{}> = () => {
  function handleHideButton() {
    chrome.runtime.sendMessage({ message: 'hideButton' });
  }

  function handleUpdateButton() {
    chrome.runtime.sendMessage({ message: 'fetchUser' }, (response) => {});
  }

  return (
    <div>
      <button onClick={handleHideButton}>hide</button>
      <button>update</button>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
