import React, { useEffect, useState, useRef } from 'react';
import { LoginPanel, ContentPanel, UnsolvedHeader } from './components';
import { IFrame } from './IFrame';

const UnsolvedFloatButton = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const panelElement = useRef(null);

  const handlePanelOpen = () => setIsClicked(true);
  const handlePanelClose = () => setIsClicked(false);

  // TODO : 로그인 상태 확인 로직 호출 시점 점검 필요( 현재는 페이지 로드 시점에 호출 )
  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchUser', type: 'async' }, (response) => {
      if (response.state === 'success') {
        setIsLogin(!!response.data);
      }
    });
  }, []);

  useEffect(() => {
    function handleOutsideClick({ target }: MouseEvent) {
      if (panelElement.current && !panelElement.current.contains(target as Node)) {
        handlePanelClose();
      }
    }
    window.addEventListener('click', handleOutsideClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleOutsideClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <div className={'unsolved-wa-container ' + (isClicked ? 'unsolved-wa-clicked' : 'unsolved-wa-default')} ref={panelElement}>
      {isClicked ? (
        <IFrame title='unsolved-content'>
          <UnsolvedHeader handlePanelClose={handlePanelClose} />
          {isLogin ? <ContentPanel /> : <LoginPanel />}
        </IFrame>
      ) : (
        <button className='unsolved-wa-floatbtn' onClick={handlePanelOpen}>
          <span className='unsolved-wa-logo-medium'>wa</span>
        </button>
      )}
    </div>
  );
};

export default UnsolvedFloatButton;
