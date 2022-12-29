import { SolvedUser } from './SolvedUser';

export const ICONS = ['face', 'star', 'recommend', 'close', 'refresh', 'edit_square'] as const;
export type ICON = typeof ICONS[number];
export type URL = string;

export type SCORING_STATE = 'DEFAULT' | 'RUNNING' | 'CORRECT' | 'WRONG' | 'TIMEOUT' | 'ERROR';

export type STORAGE_VALUE = {
  solvedUser: string;
  badge: string;
  hideButton: boolean;
  problenNo: number;
  isClicked: boolean;
};
