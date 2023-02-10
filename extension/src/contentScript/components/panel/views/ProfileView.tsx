import React from 'react';
import View from './View';
import { SolvedProfileBox, OrganizationInfoBox, UnsolvedProfileBox, RandomRecommandBox, BadgeBox } from './boxes';
import { Profile } from '../../../../@types';
import { useTeam } from '../../../hooks';

interface Props {
  profile: Profile;
}

const ProfileView = ({ profile }: Props) => {
  const { team, isLoaded, isFailed, refresh } = useTeam();
  return (
    <View>
      <SolvedProfileBox user={profile.user} />
      <OrganizationInfoBox profile={profile} />
      <UnsolvedProfileBox isLoaded={isLoaded} isFailed={isFailed} refresh={refresh} />
      <RandomRecommandBox team={team} />
      <BadgeBox />
    </View>
  );
};

export default ProfileView;
