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

export type Settings = {};

export type User = {
  background: Background;
  badge?: any;
  bio: string;
  class: number;
  classDecoration: string;
  coins: number;
  email: string;
  exp: number;
  handle: string;
  joinedAt: String;
  maxStreak: number;
  organizations: Organization[];
  proUntil?: any;
  profileImageUrl?: any;
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
