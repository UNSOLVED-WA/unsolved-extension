import { useEffect, useState } from 'react';
import { Ranking } from '../../@types';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useRanking = (team: boolean) => {
  const { isRefresh, refresh } = useRefresh();
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    // TODO: <high> teamId 값은 추후 유저한테서 받아와야함 + default 값
    if (team == null) return;
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchRanking', type: 'async' }, (response) => {
      switch (response.state) {
        case 'success':
          setRanking(response.responseData.rankings);
          break;
        case 'fail':
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, [isRefresh, team]);

  return { ranking, isLoaded, isFailed, refresh };
};
