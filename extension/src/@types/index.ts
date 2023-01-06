export const ICONS = ['face', 'star', 'recommend', 'close', 'refresh', 'edit_square'] as const;
export type ICON = typeof ICONS[number];
export type URL = string;

export type SCORING_STATE = 'DEFAULT' | 'RUNNING' | 'CORRECT' | 'WRONG' | 'TIMEOUT' | 'ERROR' | 'NETERROR';

export type STORAGE_VALUE = {
  // system value
  hideButton?: boolean;
  isClicked?: boolean;
  // profile view
  solvedUser?: SolvedUser;
  badge?: string;
  // scoring view
  scoring: { state?: SCORING_STATE; problemId?: string; score?: number };
  // recommend view
  selectedTiers?: number[];
};

export type ProblemResponse = {
  problemId: number;
  tier: number;
  problemTitle: string;
  score?: number;
  teamName?: string;
};

export type ProblemRequest = {
  bojId: string;
  problemNumber: number;
};

export type Ranking = {
  teamName: string;
  bojId: string;
  score: number;
};

export interface SolvedUser {
  emoticons: Emoticon[];
  solved: Solved[];
  user: User;
}

export type Emoticon = {
  displayName: string;
  emoticonId: string;
  emoticonUrl: string;
  unlocked: boolean;
};

export type Solved = {
  id: number;
  status: string;
};

export type Background = {
  author: string;
  authorUrl: string;
  backgroundId: string;
  backgroundImageUrl: string;
  displayDescription: string;
  displayName: string;
  hiddenConditions: boolean;
  isIllust: boolean;
  unlockedUserCount: number;
};

export type Organization = {
  color: string;
  name: string;
  organizationId: number;
  rating: number;
  solvedCount: number;
  type: string;
  userCount: number;
  voteCount: number;
};

export type Settings = Record<string, unknown>;

export type User = {
  background: Background;
  badge?: string;
  bio: string;
  class: number;
  classDecoration: string;
  coins: number;
  email: string;
  exp: number;
  handle: string;
  joinedAt: string;
  maxStreak: number;
  organizations: Organization[];
  proUntil?: string;
  profileImageUrl?: string;
  rating: number;
  ratingByClass: number;
  ratingByProblemsSum: number;
  ratingBySolvedCount: number;
  ratingByVoteCount: number;
  reverseRivalCount: number;
  rivalCount: number;
  settings: Settings;
  solvedCount: number;
  stardusts: number;
  tier: number;
  voteCount: number;
};

export type SolvingProblemRequest = {
  userId: number;
  problemNumber: number;
};

export type SolvingProblemResponse = {
  problemId: number;
  tier: number;
  problemTitle: string;
  score: number;
  teamName: string;
};

export type UnsolvedUser = {
  id: number;
  bojId: string;
  solvingCount: number;
};

export type RequestMessage =
  | (
      | 'fetchUser' //
      | 'fetchBadge'
      | 'fetchRanking'
      | 'fetchRecommands'
      | 'fetchRandomRecommand'
      | 'toLogin'
      | 'hideButton'
      | 'sendNotification'
      | 'toRedirectProblem'
      | 'toRedirectUser'
    )
  | SCORING_STATE;

export type Request = {
  message: RequestMessage;
  type?: 'async' | 'sync';
  data?: any;
};

export type Response = {
  state: 'success' | 'fail' | 'cached';
  message?: string;
  data?: any;
};

export type SendResponse = (response?: Response) => void;
