import { useEffect, useState } from 'react';
import { MessageManager } from '../../utils';

export const useAutoScoring = () => {
  const [isAutoScoring, setIsAutoScoring] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function toggleIsAutoScoring(toggle: boolean) {
    setIsLoading(true);
    MessageManager.send({ message: 'autoScoring', type: 'async', requestData: { toggle } }, (result) => {
      setIsAutoScoring(result.responseData.isAutoScoring);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    toggleIsAutoScoring(false);
  }, []);

  return { isAutoScoring, isLoading, toggleIsAutoScoring };
};
