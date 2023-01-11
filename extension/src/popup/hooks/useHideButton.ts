import { useEffect, useState } from 'react';
import { MessageManager } from '../../utils';

export const useHideButton = () => {
  const [isHide, setIsHide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function toggleIsHide(toggle: boolean) {
    setIsLoading(true);
    MessageManager.send({ message: 'hideButton', type: 'async', requestData: { toggle } }, (result) => {
      setIsHide(result.responseData.isHide);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    toggleIsHide(false);
  }, []);

  return { isHide, isLoading, toggleIsHide };
};
