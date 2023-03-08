import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';

export const useTeam = () => {
  const [team, setTeam] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  function showGuide() {
    MessageManager.send({ message: 'showGuide', type: 'sync' });
  }

  useEffect(() => {
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchTeam', type: 'async' }, (response) => {
      if (response.state === 'success') {
        console.log('team fetched');
        setTeam(true);
      } else {
        console.log('no Team');
        setIsFailed(true);
      }
      setIsLoaded(true);
    });
  }, []);

  return { team, isLoaded, isFailed, showGuide };
};
