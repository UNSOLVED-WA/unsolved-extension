import { useEffect, useState } from 'react';
import { ProblemResponse, Team } from '../../@types';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useRandomRecommandProblem = (team: boolean) => {
  const { isRefresh, refresh } = useRefresh();
  const [randomRecommand, setRandomRecommand] = useState<ProblemResponse>(null);
  const [fallback, setFallback] = useState('default');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    if (!team) return;
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchRandomRecommand', type: 'async' }, (response) => {
      switch (response.state) {
        case 'success':
          setRandomRecommand(response.responseData.problems);
          break;
        case 'fail':
          setFallback(response.fallback);
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, [team,isRefresh]);

  return { randomRecommand, fallback, isLoaded, isFailed, refresh };
};
