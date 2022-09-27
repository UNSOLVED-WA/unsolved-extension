import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LoginPanel, ContentPanel, UnsolvedHeader } from './components';
import { UnsolvedFloatButton, UnsolvedLogo } from './style/button.styled';
import './style/main.css';

const App: React.FC<{}> = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handlePanelOpen = () => setIsClicked(true);
  const handlePanelClose = () => setIsClicked(false);

  chrome.runtime.sendMessage({ message: 'fetchUser' }, (response) => {
    chrome.storage.local.get('solvedUser', (result) => {
      if (result.solvedUser) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  });

  useEffect(() => {
    function handleOutsideClick({ target }: MouseEvent) {
      const unsolvedPanel = document.querySelector('.unsolved-float-button');
      if (
        isClicked &&
        unsolvedPanel &&
        !unsolvedPanel.contains(target as Node)
      ) {
        setIsClicked(false);
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isClicked]);

  return (
    <UnsolvedFloatButton
      className="unsolved-float-button"
      isClicked={isClicked}
    >
      {isClicked ? (
        <>
          <UnsolvedHeader handlePanelClose={handlePanelClose} />
          {isLogin ? <ContentPanel /> : <LoginPanel />}
        </>
      ) : (
        <button onClick={handlePanelOpen}>
          <UnsolvedLogo size="medium">wa</UnsolvedLogo>
        </button>
      )}
    </UnsolvedFloatButton>
  );
};

const root = document.createElement('div');
root.id = 'unsolved-wa';

function handleHideInjectElement(element: HTMLElement, isHide: boolean) {
  if (isHide) {
    element.setAttribute('style', 'display: none');
  } else {
    element.setAttribute('style', 'display: block');
  }
}

chrome.storage.local.get('hideButton', (data) => {
  if (data) {
    handleHideInjectElement(root, data.hideButton);

    document.body.appendChild(root);
    ReactDOM.render(<App />, root);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideButton) {
    handleHideInjectElement(root, changes.hideButton.newValue);
  }
});
