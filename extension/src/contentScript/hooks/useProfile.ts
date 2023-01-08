import { useEffect, useState } from 'react';
import { SolvedUser } from '../../@types';
import { Message } from '../../utils/message';

export const useProfile = (isRefresh: boolean) => {
  const [profile, setProfile] = useState<SolvedUser>(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [isCached, setIsCached] = useState(false);
  // const [isFailed, setIsFailed] = useState(false);
  const [state, setState] = useState<'loading' | 'success' | 'fail' | 'noOrganization'>('loading');

  useEffect(() => {
    Message.send({ message: 'fetchUser', type: 'async' }, (response) => {
      if (response.state === 'fail') {
        setState('fail');
        return;
      }
      // if (response.state === 'cached') setIsCached(true);
      setProfile(response.responseData.solvedUser);
      if (response.responseData.solvedUser.user.organizations.length === 0) {
        setState('noOrganization');
      } else {
        setState('success');
      }
    });
  }, [isRefresh]);

  return { profile, state };
};
