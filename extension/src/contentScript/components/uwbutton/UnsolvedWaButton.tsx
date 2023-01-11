import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Novice, ContentPanel } from '..';
import { IFrame, UWHeader } from '.';
import { useProfile, useRefresh, useShow } from '../../hooks';

const UnsolvedWaButton = () => {
  const { isRefresh } = useRefresh();
  const { isShow, isScoring, containerRef, show, close, reset } = useShow();
  const { profile, state } = useProfile(isRefresh);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelectedIndex = (index: number) => setSelectedIndex(index);

  useEffect(() => {
    if (isScoring) {
      setSelectedIndex(3);
      reset();
    }
  }, [isScoring]);

  return (
    <div className={'unsolved-wa-container ' + (isShow ? 'unsolved-wa-clicked' : 'unsolved-wa-default')} ref={containerRef}>
      {isShow ? (
        <IFrame title='unsolved-content'>
          <UWHeader handlePanelClose={close} />
          {
            {
              loading: <CircularProgress />,
              success: <ContentPanel profile={profile} selectedIndex={selectedIndex} handleSelectedIndex={handleSelectedIndex} />,
              fail: <Novice type='error' />,
              noOrganization: <Novice type='noOrganization' />,
            }[state]
          }
        </IFrame>
      ) : (
        <button className='unsolved-wa-floatbtn' onClick={show}>
          <span className='unsolved-wa-logo-medium'>wa</span>
        </button>
      )}
    </div>
  );
};

export default UnsolvedWaButton;
