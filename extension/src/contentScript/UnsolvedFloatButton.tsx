import React, { useEffect, useState, useRef } from 'react';
import { LoginPanel, ContentPanel, UnsolvedHeader, UnsolvedLogo } from './components';
import Styled from './style/button.styled';

const UnsolvedFloatButton = () => {
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
    <Styled.UnsolvedFloatButton className="unsolved-float-button" ref={panelElement} isClicked={isClicked}>
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
    </Styled.UnsolvedFloatButton>
  );
};

export default UnsolvedFloatButton;
