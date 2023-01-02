import React from 'react';
import { SCORING_STATE } from '../@types';
import { Storage } from './storage';
import { DefaultIcon, RunningIcon, CorrectIcon, WrongIcon, TimeoutIcon } from '../contentScript/common/icons';

export type SCORING_OBJECT = {
  state: SCORING_STATE;
  message: string;
  icon?: (_?: { color: string }) => JSX.Element;
};

export const scorings: SCORING_OBJECT[] = [
  {
    state: 'DEFAULT',
    message: '채점을 시작하려면 문제를 풀어주세요.',
    icon: ({ color }) => <DefaultIcon color={color} />,
  },
  {
    state: 'RUNNING',
    icon: ({ color }) => <RunningIcon color={color} />,
    message: '채점 중...',
  },
  {
    state: 'CORRECT',
    icon: ({ color }) => <CorrectIcon color={color} />,
    message: '정답입니다!!',
  },
  {
    state: 'WRONG',
    icon: ({ color }) => <WrongIcon color={color} />,
    message: '틀렸습니다.',
  },
  {
    state: 'TIMEOUT',
    icon: ({ color }) => <TimeoutIcon color={color} />,
    message: '채점 시간이 초과되었습니다.',
  },
];

interface SCORING {
  getState: () => Promise<SCORING_STATE>;
  getMessageByState: (state?: SCORING_STATE) => Promise<SCORING_OBJECT>;
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
    return scorings.find((scoring) => scoring.state === _state);
  },
  setState: (state, problemId) => {
    Storage.sets({ scoringState: state, problemId: problemId });
  },
};
