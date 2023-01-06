import React, { useEffect, useState, useRef } from 'react';
import { LoginPanel, ContentPanel, UnsolvedHeader } from './components';
import { IFrame } from './IFrame';
import { Storage, Message } from '../utils';

const UnsolvedFloatButton = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelElement = useRef(null);

  const handlePanelOpen = () => setIsClicked(true);
  const handlePanelClose = () => setIsClicked(false);

  useEffect(() => {
    Message.send({ message: 'fetchUser', type: 'async' }, (response) => {
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
    Storage.get('isClicked', (result) => {
      if (result) {
        setSelectedIndex(3);
        setIsClicked(result);
        Storage.set('isClicked', false);
      }
    });
    return () => {
      window.removeEventListener('click', handleOutsideClick, { capture: true });
    };
  }, []);

  return (
    <div className={'unsolved-wa-container ' + (isClicked ? 'unsolved-wa-clicked' : 'unsolved-wa-default')} ref={panelElement}>
      {isClicked ? (
        <IFrame title='unsolved-content'>
          <UnsolvedHeader handlePanelClose={handlePanelClose} />
          {isLogin ? <ContentPanel selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} /> : <LoginPanel />}
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
