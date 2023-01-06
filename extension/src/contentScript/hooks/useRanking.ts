import { useEffect, useState } from 'react';
import { Ranking } from '../../@types';
import { Message } from '../../utils/message';

export const useRanking = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    // TODO: 해당 그룹의 teamId(data)를 받아와야함
    Message.send({ message: 'fetchRanking', type: 'async', data: '1' }, (response) => {
      switch (response.state) {
        case 'success':
          setRanking(response.data);
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

  return { ranking, isLoaded, isFailed };
};
