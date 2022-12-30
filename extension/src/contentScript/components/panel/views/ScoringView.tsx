import React, { useEffect, useState } from 'react';
import { Scoring } from '../../../../utils';
import { ContentBox } from '../../../common';
import { SCORING_STATE } from '../../../../@types';

const ScoringView = () => {
  const [scoringState, setScoringState] = useState<{ key: SCORING_STATE; value: string }>({ key: 'DEFAULT', value: '' });

  useEffect(() => {
    Scoring.getMessageByState().then((result) => {
      setScoringState(result);
    });
    const ScoringStateHandler = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.scoringState) {
        Scoring.getMessageByState(changes.scoringState.newValue).then((result) => {
          setScoringState(result);
        });
      }
    };
    chrome.storage.onChanged.addListener(ScoringStateHandler);
    () => chrome.storage.onChanged.removeListener(ScoringStateHandler);
  }, []);

  return (
    <div className='panel-contents' style={{ height: '100%' }}>
      <ContentBox fullHeight>
        <div>{scoringState.value}</div>
      </ContentBox>
    </div>
  );
};

export default ScoringView;
