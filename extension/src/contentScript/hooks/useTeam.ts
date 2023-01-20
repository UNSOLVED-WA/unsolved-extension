import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useTeam = () => {
  const { isRefresh, refresh } = useRefresh();
  const [team, setTeam] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchTeam', type: 'async' }, (response) => {
      if (response.state === 'success') setTeam(true);
      else setIsFailed(true);
      setIsLoaded(true);
    });
  }, [isRefresh]);

  return { team, isLoaded, isFailed, refresh };
};
