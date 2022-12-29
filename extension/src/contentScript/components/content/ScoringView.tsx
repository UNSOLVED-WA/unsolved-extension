import React, { useEffect, useState } from 'react';
import { Scoring } from '../../../background/scoring';
import { ContentBox } from '../../common';

const ScoringView = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    Scoring.getMessageByState().then((message) => {
      setMessage(message);
    });
    const ScoringStateHandler = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.scoringState) {
        Scoring.getMessageByState(changes.scoringState.newValue).then((message) => {
          setMessage(message);
        });
      }
    };
    chrome.storage.onChanged.addListener(ScoringStateHandler);
    return () => chrome.storage.onChanged.removeListener(ScoringStateHandler);
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <div className='panel-contents' style={{ height: '100%' }}>
      <ContentBox fullHeight>
        <div>{message}</div>
      </ContentBox>
    </div>
  );
};

export default ScoringView;
