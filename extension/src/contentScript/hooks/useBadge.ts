import { useEffect, useState } from 'react';

export const useBadge = () => {
  const [badge, setBadge] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchBadge', type: 'async' }, (response) => {
      switch (response.state) {
        case 'cached':
          setIsCached(true);
          setBadge(response.data);
          break;
        case 'success':
          setBadge(response.data);
          break;
        case 'fail':
          setIsFailed(true);
          break;
        default:
          break;
      }
      setIsLoaded(true);
    });
  }, []);

  return { badge, isLoaded, isCached, isFailed };
};