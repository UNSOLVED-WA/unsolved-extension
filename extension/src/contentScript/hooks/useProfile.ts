import { useEffect, useState } from 'react';
import { SolvedUser, Profile } from '../../@types';
import { MessageManager } from '../../utils';

type State = 'loading' | 'success' | 'fail';

export const useProfile = (isRefresh: boolean): { profile: Profile; state: State } => {
  const [profile, setProfile] = useState<SolvedUser>(null);
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    setState('loading');
    MessageManager.send({ message: 'fetchUser', type: 'async' }, (response) => {
      if (response.state === 'fail' || response.state === 'cached') {
        setState('fail');
        return;
      } else {
        setProfile(response.responseData.solvedUser);
        setState('success');
      }
    });
  }, [isRefresh]);

  return { profile, state };
};
