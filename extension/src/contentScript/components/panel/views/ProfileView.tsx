import React from 'react';
import View from './View';
import { SolvedProfileBox, OrganizationInfoBox, UnsolvedProfileBox, BadgeBox } from './boxes';
import { Profile } from '../../../../@types';

interface Props {
  profile: Profile;
}

const ProfileView = ({ profile }: Props) => {
  return (
    <View>
      <SolvedProfileBox user={profile.user} />
      <OrganizationInfoBox />
      <UnsolvedProfileBox />
      <BadgeBox />
    </View>
  );
};

export default ProfileView;
