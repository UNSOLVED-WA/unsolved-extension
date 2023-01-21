import React from 'react';
import View from './View';
import { SolvedProfileBox, OrganizationInfoBox, UnsolvedProfileBox, RandomRecommandBox, BadgeBox } from './boxes';
import { Profile } from '../../../../@types';

interface Props {
  profile: Profile;
}

const ProfileView = ({ profile }: Props) => {
  return (
    <View>
      <SolvedProfileBox user={profile.user} />
      <OrganizationInfoBox profile={profile} />
      <UnsolvedProfileBox />
      <RandomRecommandBox />
      <BadgeBox />
    </View>
  );
};

export default ProfileView;
