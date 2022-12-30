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

  /**
   * 필요한 정보
   * 1. 현재 상태 message + icon
   * 2. 재시도 버튼 (현재 상태가 'RUNNING' 이면 동작 안함)
   * 3. 맞았을 때 오르는 점수? (<- 점수 있는지 확인하기)
   * ㄴ 재시도 버튼과 점수는 같은 컴포넌트로 묶어서 둘 중 하나만 보이게 하기
   */
  return (
    <div className='panel-contents' style={{ height: '100%' }}>
      <ContentBox fullHeight>
        <div>{scoringState.value}</div>
      </ContentBox>
    </div>
  );
};

export default ScoringView;
