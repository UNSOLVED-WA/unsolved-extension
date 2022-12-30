import { SCORING_STATE } from '../@types';
import { Storage } from './storage';
interface SCORING {
  getState: () => Promise<SCORING_STATE>;
  getMessageByState: (state?: SCORING_STATE) => Promise<string>;
  setState: (scoringState: SCORING_STATE, problemId?: string) => void;
}
export const Scoring: SCORING = {
  getState: () => {
    return new Promise((resolve) => {
      Storage.get('scoringState', (result) => {
        resolve(result);
      });
    });
  },
  getMessageByState: async (state?: SCORING_STATE) => {
    const _state = state ?? (await Scoring.getState());
    switch (_state) {
      case 'DEFAULT':
        return '채점을 시작하려면 문제를 풀어주세요.';
      case 'RUNNING':
        return '채점 중...';
      case 'CORRECT':
        return '정답입니다!!';
      case 'WRONG':
        return '틀렸습니다.';
      case 'TIMEOUT':
        return '채점 시간이 초과되었습니다.';
      default:
        return '채점을 시작하려면 문제를 풀어주세요.';
    }
  },
  setState: (state, problemId) => {
    Storage.sets({ scoringState: state, problemId: problemId });
  },
};
