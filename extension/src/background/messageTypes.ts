export type RequestMessage = 'fetchUser' | 'fetchBadge' | 'submit' | 'toLogin' | 'hideButton' | 'sendNotification';

export type Request = {
  message: RequestMessage;
  type?: 'async' | 'sync';
  data?: any;
};

export type Response = {
  message: 'success' | 'fail';
  data?: any;
};

export type SendResponse = (response?: Response) => void;
