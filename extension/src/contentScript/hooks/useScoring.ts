import { useEffect, useState } from 'react';
import { ScoringManager, ScoringObject } from '../../utils';

export const useScoring = () => {
  const [scoring, setScoring] = useState<ScoringObject>(ScoringManager.getByState());

  function messageByScore() {
    if (scoring.score === -1 || scoring.score === 0) {
      return '이미 채점이 완료된 문제입니다.';
    }
    return '+ ' + scoring.score + 'pts';
  }
  function retry() {
    ScoringManager.set('RUNNING');
  }

  useEffect(() => {
    if (window.location.href.includes('https://www.acmicpc.net/')) {
      ScoringManager.get().then((result) => {
        setScoring(result);
      });
    }
    const ScoringStateHandler = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.scoring && window.location.href.includes('https://www.acmicpc.net/')) {
        ScoringManager.get().then((result) => {
          setScoring(result);
        });
      }
    };
    chrome.storage.onChanged.addListener(ScoringStateHandler);
    return () => chrome.storage.onChanged.removeListener(ScoringStateHandler);
  }, []);

  return { scoring, retry, messageByScore };
};
