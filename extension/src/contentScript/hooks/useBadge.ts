import { useEffect, useState } from 'react';
import { MessageManager } from '../../utils';
import { useRefresh } from './useRefresh';

export const useBadge = () => {
  const { isRefresh, refresh } = useRefresh();
  const [badge, setBadge] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchBadge', type: 'async' }, (response) => {
      switch (response.state) {
        case 'cached':
          setIsCached(true);
          setBadge(response.responseData.badge);
          break;
        case 'success':
          setBadge(response.responseData.badge);
          break;
        case 'fail':
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, [isRefresh]);

  return { badge, isLoaded, isCached, isFailed, refresh };
};
