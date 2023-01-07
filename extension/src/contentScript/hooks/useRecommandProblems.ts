import { useEffect, useState } from 'react';
import { ProblemResponse } from '../../@types';
import { Message, Storage } from '../../utils';

export const useRecommandProblems = () => {
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const refresh = () => setIsRefresh((prev) => !prev);
  const changeTiers = (tier: number) => {
    // let _selectedTiers = selectedTiers;
    // if (selectedTiers.includes(tier)) {
    //   _selectedTiers = selectedTiers.filter((t) => t !== tier);
    // } else {
    //   _selectedTiers = [tier];
    // }
    Storage.set('selectedTiers', [tier], (result) => {
      setSelectedTiers(result);
    });
  };

  useEffect(() => {
    Storage.get('selectedTiers', (result) => {
      if (result) setSelectedTiers(result);
    });
  }, []);

  useEffect(() => {
    if (selectedTiers.length === 0) return;
    setIsLoaded(false);
    Message.send({ message: 'fetchRecommands', type: 'async', data: { teamId: '1', tier: selectedTiers[0] } }, (response) => {
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
  }, [isRefresh, selectedTiers]);

  return { recommand, selectedTiers, changeTiers, isLoaded, isFailed, refresh };
};
