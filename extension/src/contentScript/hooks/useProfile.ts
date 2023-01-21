import { useEffect, useState } from 'react';
import { SolvedUser, Profile } from '../../@types';
import { MessageManager } from '../../utils';

type State = 'loading' | 'success' | 'fail' | 'noOrganization';

export const useProfile = (isRefresh: boolean): { profile: Profile; state: State } => {
  const [profile, setProfile] = useState<SolvedUser>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [state, setState] = useState<State>('loading');

  function setOrganization(selectedOrganization: string) {
    MessageManager.send({ message: 'selectedOrganization', type: 'async', requestData: { selectedOrganization } }, (response) => {
      setSelectedOrganization(response.responseData.selectedOrganization);
    });
  }

  function getOrganization() {
    return profile.user.organizations.find((organization) => {
      return organization.name === selectedOrganization;
    });
  }

  function getOrganizations() {
    return profile.user.organizations;
  }

  useEffect(() => {
    setState('loading');
    MessageManager.send({ message: 'fetchUser', type: 'async' }, (response) => {
      if (response.state === 'fail' || response.state === 'cached') {
        setState('fail');
        return;
      }
      if (response.responseData.solvedUser.user.organizations.length === 0) {
        setState('noOrganization');
      } else {
        setSelectedOrganization(response.responseData.selectedOrganization);
        setProfile(response.responseData.solvedUser);
        setState('success');
      }
    });
  }, [isRefresh]);

  return { profile: { ...profile, getOrganization, getOrganizations, setOrganization }, state };
};
