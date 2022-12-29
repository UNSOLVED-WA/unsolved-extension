export type RequestMessage =
  | 'fetchUser' //
  | 'fetchBadge'
  | 'fetchRanking'
  | 'fetchRecommand'
  | 'submit'
  | 'toLogin'
  | 'hideButton'
  | 'sendNotification'
  | 'toRedirectProblem'
  | 'toRedirectUser'
  | 'toRunning'
  | 'toCorrect';

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
