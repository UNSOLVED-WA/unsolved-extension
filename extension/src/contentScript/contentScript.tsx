import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LoginPanel, ContentPanel } from './components';
import { UnsolvedFloatButton, UnsolvedLogo } from './style/button.styled';
import './style/main.css';

const App: React.FC<{}> = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (e) => {
    if (e.currentTarget.classList.contains('clicked')) {
      e.currentTarget.classList.remove('clicked');
      setIsClicked(false);
    } else {
      e.currentTarget.classList.add('clicked');
      setIsClicked(true);
    }
  };

  chrome.runtime.sendMessage({ message: 'userStatus' }, (response) => {
    chrome.storage.local.get('solvedUser', (result) => {
      if (result.solvedUser) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  });

  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent) => {
      const unsolvedPanel = document.querySelector('.unsolved-float-button');
      if (unsolvedPanel && !unsolvedPanel.contains(target as Node)) {
        setIsClicked(false);
        unsolvedPanel.classList.remove('clicked');
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isClicked]);

  return (
    <UnsolvedFloatButton className="unsolved-float-button" onClick={handleButtonClick} isClicked={isClicked}>
      <UnsolvedLogo size="medium">wa</UnsolvedLogo>
      {isClicked ?? (isLogin ? <ContentPanel /> : <LoginPanel />)}
    </UnsolvedFloatButton>
  );
};

const root = document.createElement('div');
root.id = 'unsolved-wa';
document.body.appendChild(root);

ReactDOM.render(<App />, root);
