import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LoginPanel, ContentPanel, UnsolvedHeader, UnsolvedLogo } from './components';
import { UnsolvedFloatButton } from './style/button.styled';
import './style/main.css';

const App: React.FC<{}> = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const panelElement = useRef(null);

  const handlePanelOpen = () => setIsClicked(true);
  const handlePanelClose = () => setIsClicked(false);

  chrome.runtime.sendMessage({ message: 'fetchUser' }, () => {
    chrome.storage.local.get('solvedUser', (result) => {
      setIsLogin(result.solvedUser ? true : false);
    });
  });

  useEffect(() => {
    function handleOutsideClick({ target }: MouseEvent) {
      if (panelElement.current && !panelElement.current.contains(target as Node)) {
        setIsClicked(false);
      }
    }
    window.addEventListener('click', handleOutsideClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleOutsideClick, { capture: true });
    };
  }, []);

  return (
    <UnsolvedFloatButton className="unsolved-float-button" ref={panelElement} isClicked={isClicked}>
      {isClicked ? (
        <>
          <UnsolvedHeader handlePanelClose={handlePanelClose} />
          {isLogin ? <ContentPanel /> : <LoginPanel />}
        </>
      ) : (
        <button onClick={handlePanelOpen}>
          <UnsolvedLogo size="medium" />
        </button>
      )}
    </UnsolvedFloatButton>
  );
};

const root = document.createElement('div');
root.id = 'unsolved-wa';

function handleHideInjectElement(element: HTMLElement, isHide: boolean) {
  element.style.display = isHide ? 'none' : 'block';
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
