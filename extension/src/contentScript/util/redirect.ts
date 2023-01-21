import { MessageManager } from '../../utils';

export const redirectUserInfo = (bojId: string) => {
  MessageManager.send({ message: 'toRedirectUser', type: 'sync', requestData: { bojId } });
};

export const redirectProblemInfo = (problemId: number) => {
  MessageManager.send({ message: 'toRedirectProblem', type: 'sync', requestData: { problemId } });
};
