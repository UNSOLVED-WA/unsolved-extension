import { useEffect, useState } from 'react';
import { SolvedUser } from '../../@types';
import { MessageManager } from '../../utils';

export const useProfile = (isRefresh: boolean) => {
  const [profile, setProfile] = useState<SolvedUser & { selectedOrganization: string }>(null);
  const [state, setState] = useState<'loading' | 'success' | 'fail' | 'noOrganization'>('loading');

  useEffect(() => {
    MessageManager.send({ message: 'fetchUser', type: 'async' }, (response) => {
      if (response.state === 'fail' || response.state === 'cached') {
        setState('fail');
        return;
      }
      if (response.responseData.solvedUser.user.organizations.length === 0) {
        setProfile({ ...response.responseData.solvedUser, selectedOrganization: '' });
        setState('noOrganization');
      } else {
        setProfile({
          ...response.responseData.solvedUser,
          selectedOrganization: response.responseData.solvedUser.user.organizations[0].name,
        });
        setState('success');
      }
    });
  }, [isRefresh]);

  return { profile, state };
};
