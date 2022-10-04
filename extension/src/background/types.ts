export type Request = {
  message: string;
  type?: 'async' | 'sync';
  data?: any;
};

export type Response = {
  message: any;
  data?: any;
};

export type SendResponse = (response?: Response) => void;
