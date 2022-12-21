export type RequestMessage =
  | 'fetchUser' //
  | 'fetchBadge'
  | 'fetchRanking'
  | 'submit'
  | 'toLogin'
  | 'hideButton'
  | 'sendNotification'
  | 'toRegisterInSchool';

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
