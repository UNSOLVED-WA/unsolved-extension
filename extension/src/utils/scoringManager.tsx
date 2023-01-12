import { StorageManager } from './storageManager';
import { DefaultIcon, RunningIcon, CorrectIcon, WrongIcon, TimeoutIcon, NeterrorIcon } from '../contentScript/common/icons';
import { SCORING_STATE, STORAGE_VALUE } from '../@types';

export type ScoringObject = {
  message: string;
  icon?: () => JSX.Element;
} & STORAGE_VALUE['scoring'];

function findMessage(state: SCORING_STATE): string {
  switch (state) {
    case 'DEFAULT':
      return '문제를 풀어주세요!';
    case 'RUNNING':
      return '채점 중...';
    case 'CORRECT':
      return '정답입니다!!';
    case 'WRONG':
      return '틀렸습니다.';
    case 'TIMEOUT':
      return '채점 시간 초과';
    case 'NETERROR':
      return '네트워크 에러 발생!';
    default:
      return '문제를 풀어주세요!';
  }
}

function findIcon(state: SCORING_STATE) {
  switch (state) {
    case 'DEFAULT':
      return DefaultIcon;
    case 'RUNNING':
      return RunningIcon;
    case 'CORRECT':
      return CorrectIcon;
    case 'WRONG':
      return WrongIcon;
    case 'TIMEOUT':
      return TimeoutIcon;
    case 'NETERROR':
      return NeterrorIcon;
    default:
      return DefaultIcon;
  }
}

interface ScoringManager {
  get: () => Promise<ScoringObject>;
  getByState: (state?: SCORING_STATE) => ScoringObject;
  set: (state?: SCORING_STATE, problemId?: string, score?: number) => void;
}
export const ScoringManager: ScoringManager = {
  get: () => {
    return new Promise((resolve) => {
      StorageManager.get('scoring').then((result) => {
        resolve({ ...result, message: findMessage(result.state), icon: findIcon(result.state) });
      });
    });
  },
  getByState: (state = 'DEFAULT') => {
    return { state: state, message: findMessage(state), icon: findIcon(state) };
  },
  set: (state, problemId, score) => {
    StorageManager.set('scoring', { state: state, problemId: problemId, score: score });
  },
};
