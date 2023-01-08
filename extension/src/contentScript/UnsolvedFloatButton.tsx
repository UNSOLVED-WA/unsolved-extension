import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { Novice, ContentPanel, UnsolvedHeader } from './components';
import { IFrame } from './IFrame';
import { useProfile } from './hooks';
import { StorageManager } from '../utils';

const UnsolvedFloatButton = () => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const { profile, state } = useProfile(isRefresh);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelElement = useRef(null);

  const refresh = () => setIsRefresh((prev) => !prev);
  const handlePanelOpen = () => setIsClicked(true);
  const handlePanelClose = () => setIsClicked(false);

  useEffect(() => {
    function handleOutsideClick({ target }: MouseEvent) {
      if (panelElement.current && !panelElement.current.contains(target as Node)) {
        handlePanelClose();
      }
    }
    window.addEventListener('click', handleOutsideClick, { capture: true });
    StorageManager.get('isClicked', (result) => {
      if (result) {
        setSelectedIndex(3);
        setIsClicked(result);
        StorageManager.set('isClicked', false);
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
          {
            {
              loading: <CircularProgress />,
              success: <ContentPanel profile={profile} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />,
              error: <Novice type='error' />,
              noOrganization: <Novice type='noOrganization' />,
            }[state]
          }
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
