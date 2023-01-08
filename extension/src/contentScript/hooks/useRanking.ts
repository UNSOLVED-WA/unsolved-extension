import { useEffect, useState } from 'react';
import { Ranking } from '../../@types';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useRanking = () => {
  const { isRefresh, refresh } = useRefresh();
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    // TODO: <high> 해당 그룹의 teamId(data)를 받아와야함
    MessageManager.send({ message: 'fetchRanking', type: 'async', requestData: { teamId: '1' } }, (response) => {
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
  }, [isRefresh]);

  return { ranking, isLoaded, isFailed, refresh };
};
