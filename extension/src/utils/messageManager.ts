import { Request, ResponseByRequest } from '../@types';

// TODO: <high> 제네릭 타입이 원하는 결과를 내지 못함 이유 찾아보기
export const MessageManager = {
  send: <T extends Request>(request: T, callback?: (response: ResponseByRequest<T>) => void) => {
    chrome.runtime.sendMessage(request, callback);
  },
};
