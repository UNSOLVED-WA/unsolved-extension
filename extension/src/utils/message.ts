import { Request } from '../@types';

// TODO : <low> response type 정의
interface MESSAGE {
  send: (message: Request, callback?: (response: any) => void) => void;
}
export const Message: MESSAGE = {
  send: (message, callback) => {
    chrome.runtime.sendMessage(message, callback);
  },
};
