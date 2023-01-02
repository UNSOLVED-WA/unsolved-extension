import React from 'react';
import { Storage } from './storage';
import { DefaultIcon, RunningIcon, CorrectIcon, WrongIcon, TimeoutIcon } from '../contentScript/common/icons';
import { SCORING_STATE } from '../@types';
import { IconComponentProps } from '../contentScript/common/icons/Icon';

export type SCORING_OBJECT = {
  state: SCORING_STATE;
  message: string;
  icon?: (_?: IconComponentProps) => JSX.Element;
};

export const scorings: SCORING_OBJECT[] = [
  {
    state: 'DEFAULT',
    message: '채점을 시작하려면 문제를 풀어주세요.',
    icon: ({ color, width, height }) => <DefaultIcon color={color} width={width} height={height} />,
  },
  {
    state: 'RUNNING',
    icon: ({ color, width, height }) => <RunningIcon color={color} width={width} height={height} />,
    message: '채점 중...',
  },
  {
    state: 'CORRECT',
    icon: ({ color, width, height }) => <CorrectIcon color={color} width={width} height={height} />,
    message: '정답입니다!!',
  },
  {
    state: 'WRONG',
    icon: ({ color, width, height }) => <WrongIcon color={color} width={width} height={height} />,
    message: '틀렸습니다.',
  },
  {
    state: 'TIMEOUT',
    icon: ({ color, width, height }) => <TimeoutIcon color={color} width={width} height={height} />,
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
