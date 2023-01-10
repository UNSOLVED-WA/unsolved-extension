import { useEffect, useState } from 'react';
import { MessageManager } from '../../utils';

export const useCommandsToggleVisible = () => {
  const [isUseCommandsToggleVisible, setIsUseCommandsToggleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function toggleIsUseCommands(toggle: boolean) {
    setIsLoading(true);
    MessageManager.send({ message: 'useCommandsToggleVisible', type: 'async', requestData: { toggle } }, (result) => {
      setIsUseCommandsToggleVisible(result.responseData.isUseCommandsToggleVisible);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    toggleIsUseCommands(false);
  }, []);

  return { isUseCommandsToggleVisible, isLoading, toggleIsUseCommands };
};
