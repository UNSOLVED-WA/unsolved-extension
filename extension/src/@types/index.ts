export const ICONS = ['face', 'star', 'recommend', 'close', 'refresh', 'edit_square', 'group_add'] as const;
export type ICON = typeof ICONS[number];
export type URL = string;

export type SCORING_STATE = 'DEFAULT' | 'RUNNING' | 'CORRECT' | 'WRONG' | 'TIMEOUT' | 'ERROR' | 'NETERROR';

export type STORAGE_VALUE = {
  // system value
  hideButton?: boolean;
  isClicked?: boolean;
  // profile view
  solvedUser?: SolvedUser;
  organizations?: Organization[];
  selectedOrganization?: Organization;
  badge?: string;
  // scoring view
  autoScoring?: boolean;
  scoring: { state?: SCORING_STATE; problemId?: string; score?: number };
  // recommend view
  selectedTiers?: number[];
  // background
  commands: {
    toggle_visible: boolean;
  };
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

export type Team = {
  teamId: string;
  teamName: string;
};

export interface SolvedUserRequest {
  handle: string;
  solved: Solved[];
}

export type Profile = SolvedUser;

export interface SolvedUser {
  user: User;
  aggredOn: AggredOn;
  solved: Solved[];
  emoticons: Emoticon[];
}

export interface AggredOn {
  tos: string;
  privacy: string;
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
  handle: string;
  bio: string;
  badgeId: string;
  backgroundId: string;
  profileImageUrl: string;
  solvedCount: number;
  voteCount: number;
  class: number;
  classDecoration: string;
  rivalCount: number;
  reverseRivalCount: number;
  tier: number;
  rating: number;
  exp: number;
  ratingByProblemsSum: number;
  ratingByClass: number;
  ratingBySolvedCount: number;
  ratingByVoteCount: number;
  maxStreak: number;
  coins: number;
  stardusts: number;
  joinedAt: string;
  bannedUntil: string;
  proUntil: string;
  settings: Settings;
  email: string;
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

// chrome.runtime.*message에 사용되는 타입
type MessageInterface = {
  message: string;
  type: 'sync' | 'async';
  requestData?: unknown;
  responseData?: unknown;
};

export interface FetchUser extends MessageInterface {
  message: 'fetchUser';
  type: 'async';
  requestData?: null;
  responseData?: { solvedUser: SolvedUser };
}

export interface FetchTeam extends MessageInterface {
  message: 'fetchTeam';
  type: 'async';
  requestData?: null;
  responseData?: { team: Team };
}

export interface CreateUnsolvedUser extends MessageInterface {
  message: 'createUnsolvedUser';
  type: 'async';
  requestData?: null;
  responseData?: { unsolvedUser: UnsolvedUser };
}

export interface FetchUnsolvedUser extends MessageInterface {
  message: 'fetchUnsolvedUser';
  type: 'async';
  requestData?: null;
  responseData?: { unsolvedUser: UnsolvedUser };
}

export interface FetchOrganization extends MessageInterface {
  message: 'fetchOrganization';
  type: 'async';
  requestData?: null;
  responseData?: { organizations: Organization[]; selectedOrganization: Organization };
}

export interface ShowGuide extends MessageInterface {
  message: 'showGuide';
  type: 'sync';
  requestData?: null;
  responseData?: null;
}

export type FetchBadge = {
  message: 'fetchBadge';
  type: 'async';
  requestData?: null;
  responseData?: { badge: string };
};

export type FetchRanking = {
  message: 'fetchRanking';
  type: 'async';
  requestData?: null;
  responseData?: { rankings: Ranking[] };
};

export type FetchRecommands = {
  message: 'fetchRecommands';
  type: 'async';
  requestData: { tier: number };
  responseData?: { problems: ProblemResponse[] };
};

export type FetchRandomRecommand = {
  message: 'fetchRandomRecommand';
  type: 'async';
  requestData?: null;
  responseData?: { problems: ProblemResponse };
};

export type SelectedOrganization = {
  message: 'selectedOrganization';
  type: 'async';
  requestData: { selectedOrganization: Organization };
  responseData?: { selectedOrganization: Organization };
};

export type ToAddOrganization = {
  message: 'toAddOrganization';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type ToLogin = {
  message: 'toLogin';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type UseCommandsToggleVisible = {
  message: 'useCommandsToggleVisible';
  type: 'async';
  requestData?: { toggle: boolean };
  responseData?: { isUseCommandsToggleVisible: boolean };
};

export type AutoScoring = {
  message: 'autoScoring';
  type: 'async';
  requestData?: { toggle: boolean };
  responseData?: { isAutoScoring: boolean };
};

export type HideButton = {
  message: 'hideButton';
  type: 'async';
  requestData?: { toggle: boolean };
  responseData?: { isHide: boolean };
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

export type OpenGuide = {
  message: 'OpenGuide';
  type: 'sync';
  requestData?: null;
  responseData?: null;
};

export type Message =
  | FetchUser
  | CreateUnsolvedUser
  | FetchUnsolvedUser
  | FetchTeam
  | FetchBadge
  | FetchRanking
  | FetchRecommands
  | FetchRandomRecommand
  | FetchOrganization
  | SelectedOrganization
  | ToLogin
  | ToAddOrganization
  | UseCommandsToggleVisible
  | AutoScoring
  | HideButton
  | SendNotification
  | ToRedirectProblem
  | ToRedirectUser
  | ShowGuide
  | DEFAULT
  | RUNNING
  | CORRECT
  | WRONG
  | TIMEOUT
  | ERROR
  | NETERROR
  | OpenGuide;

export type FindByMessage<Union, T> = Union extends { message: T } ? Union : never;
export type FindResponse<Union, T> = Union extends { message: T } ? Union : never;

export type RequestByMessage<T extends Message['message']> = FindByMessage<Message, T>;
export type ResponseByMesage<T extends Message['message']> = Omit<FindByMessage<Message, T>, 'message' | 'type' | 'requestData'> & {
  state: 'success' | 'fail' | 'cached';
  errorMessage?: string;
  fallback?: string;
};

export type Request = RequestByMessage<Message['message']>;
export type ResponseByRequest<T extends Request> = ResponseByMesage<T['message']>;
export type Response = ResponseByMesage<Message['message']>;

export type SendResponse<T = Message['message']> = (response?: ResponseByMesage<T extends Message['message'] ? T : never>) => void;
