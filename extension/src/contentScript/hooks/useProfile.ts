import { useEffect, useState } from 'react';
import { SolvedUser } from '../../@types';
import { Message } from '../../utils/message';

export const useProfile = (isRefresh: boolean) => {
  const [profile, setProfile] = useState<SolvedUser>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    Message.send({ message: 'fetchUser', type: 'async' }, (response) => {
      switch (response.state) {
        case 'cached':
          setIsCached(true);
          setProfile(response.data);
          break;
        case 'success':
          setProfile(response.data);
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

  return { profile, isLoaded, isCached, isFailed };
};
