import { useEffect, useState } from 'react';
import { ProblemResponse } from '../../@types';
import { MessageManager, StorageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useRecommandProblems = (team: boolean) => {
  const { isRefresh, refresh } = useRefresh();
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const changeTiers = (tier: number) => {
    StorageManager.set('selectedTiers', [tier], (result) => {
      setSelectedTiers(result);
    });
  };

  useEffect(() => {
    StorageManager.get('selectedTiers', (result) => {
      if (result) setSelectedTiers(result);
    });
  }, []);

  useEffect(() => {
    if (selectedTiers.length === 0 || team == null) return;
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchRecommands', type: 'async', requestData: { tier: selectedTiers[0] } }, (response) => {
      switch (response.state) {
        case 'success':
          setRecommand(response.responseData.problems);
          break;
        case 'fail':
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, [isRefresh, selectedTiers, team]);

  return { recommand, selectedTiers, refresh, changeTiers, isLoaded, isFailed };
};
