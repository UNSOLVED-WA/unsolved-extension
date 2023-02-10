import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';
import { Team } from '../../@types';

export const useTeam = () => {
  const { isRefresh, refresh } = useRefresh();
  const [team, setTeam] = useState<Team>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const openGuide = () => {
    MessageManager.send({ message: 'OpenGuide', type: 'sync' });
  };

  useEffect(() => {
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchTeam', type: 'async' }, (response) => {
      if (response.state === 'success') setTeam(response.responseData.team);
      else setIsFailed(true);
      setIsLoaded(true);
    });
  }, [isRefresh]);

  return { team, openGuide, isLoaded, isFailed, refresh };
};
