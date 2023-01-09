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

export type FetchUser = {
  message: 'fetchUser';
  type: 'async';
  requestData?: null;
  responseData?: { solvedUser: SolvedUser };
};

export type FetchBadge = {
  message: 'fetchBadge';
  type: 'async';
  requestData?: null;
  responseData?: { badge: string };
};

export type FetchRanking = {
  message: 'fetchRanking';
  type: 'async';
  requestData: { teamId: string };
  responseData?: { rankings: Ranking[] };
};

export type FetchRecommands = {
  message: 'fetchRecommands';
  type: 'async';
  requestData: { teamId: string; tier: number };
  responseData?: { problems: ProblemResponse[] };
};

export type FetchRandomRecommand = {
  message: 'fetchRandomRecommand';
  type: 'async';
  requestData: { teamId: string; tier: string };
  responseData?: { problems: ProblemResponse };
};

export type ToLogin = {
  message: 'toLogin';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type HideButton = {
  message: 'hideButton';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type SendNotification = {
  message: 'sendNotification';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type ToRedirectProblem = {
  message: 'toRedirectProblem';
  type: 'sync';
  requestData: { problemId: number };
  responseData?: null;
};

export type ToRedirectUser = {
  message: 'toRedirectUser';
  type: 'sync';
  requestData: { bojId: string };
  responseData?: null;
};

export type DEFAULT = {
  message: 'DEFAULT';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type RUNNING = {
  message: 'RUNNING';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type CORRECT = {
  message: 'CORRECT';
  type: 'sync';
  requestData: { problemId: string };
  responseData?: null;
};

export type WRONG = {
  message: 'WRONG';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type TIMEOUT = {
  message: 'TIMEOUT';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type ERROR = {
  message: 'ERROR';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type NETERROR = {
  message: 'NETERROR';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type Message =
  | FetchUser
  | FetchBadge
  | FetchRanking
  | FetchRecommands
  | FetchRandomRecommand
  | ToLogin
  | HideButton
  | SendNotification
  | ToRedirectProblem
  | ToRedirectUser
  | DEFAULT
  | RUNNING
  | CORRECT
  | WRONG
  | TIMEOUT
  | ERROR
  | NETERROR;

export type FindByMessage<Union, T> = Union extends { message: T } ? Union : never;
export type FindResponse<Union, T> = Union extends { message: T } ? Union : never;

export type RequestByMessage<T extends Message['message']> = FindByMessage<Message, T>;
export type ResponseByMesage<T extends Message['message']> = Omit<FindByMessage<Message, T>, 'message' | 'type' | 'requestData'> & {
  state: 'success' | 'fail' | 'cached';
  errorMessage?: string;
};

export type Request = RequestByMessage<Message['message']>;
export type ResponseByRequest<T extends Request> = ResponseByMesage<T['message']>;
export type Response = ResponseByMesage<Message['message']>;

export type SendResponse<T = Message['message']> = (response?: ResponseByMesage<T extends Message['message'] ? T : never>) => void;
