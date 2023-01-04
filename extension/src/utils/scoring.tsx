import { Storage } from './storage';
import { DefaultIcon, RunningIcon, CorrectIcon, WrongIcon, TimeoutIcon, NeterrorIcon } from '../contentScript/common/icons';
import { SCORING_STATE, STORAGE_VALUE } from '../@types';
import { IconComponentProps } from '../contentScript/common/icons/Icon';

export type SCORING_OBJECT = {
  message: string;
  icon?: (_?: IconComponentProps) => JSX.Element;
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
  get: () => Promise<SCORING_OBJECT>;
  getByState: (state?: SCORING_STATE) => SCORING_OBJECT;
  set: (state?: SCORING_STATE, problemId?: string, score?: number) => void;
}
export const ScoringManager: ScoringManager = {
  get: () => {
    return new Promise((resolve) => {
      Storage.get('scoring').then((result) => {
        resolve({ ...result, message: findMessage(result.state), icon: findIcon(result.state) });
      });
    });
  },
  getByState: (state = 'DEFAULT') => {
    return { scoringState: state, message: findMessage(state), icon: findIcon(state) };
  },
  set: (state, problemId, score) => {
    Storage.set('scoring', { state: state, problemId: problemId, score: score });
  },
};
