import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';
import { useOrganization } from './useOrganization';

export const useTeam = () => {
  const { selectedOrganization } = useOrganization();
  const [team, setTeam] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  function showGuide() {
    MessageManager.send({ message: 'showGuide', type: 'sync' });
  }

  useEffect(() => {
    if (!selectedOrganization) return;
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchTeam', type: 'async' }, (response) => {
      if (response.state === 'success') {
        setTeam(true);
      } else {
        setIsFailed(true);
      }
      setIsLoaded(true);
    });
  }, [selectedOrganization]);

  return { team, isLoaded, isFailed, showGuide };
};
