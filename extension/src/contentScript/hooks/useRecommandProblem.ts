import { useEffect, useState } from 'react';
import { ProblemResponse } from '../../@types';
import { Message } from '../../utils';

export const useRecommandProblems = () => {
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    // TODO: teamId, tier 값은 추후 유저한테서 받아와야함 + default 값
    Message.send({ message: 'fetchRecommand', type: 'async', data: { teamId: '1', tier: '1' } }, (response) => {
      switch (response.state) {
        case 'success':
          setRecommand(response.data);
          break;
        case 'fail':
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, []);
  return { recommand, isLoaded, isFailed };
};
