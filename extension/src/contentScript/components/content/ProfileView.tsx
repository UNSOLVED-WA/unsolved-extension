import React from 'react';
import { ContentBox } from '../../common';
import SVG from 'react-inlinesvg';
import { CircularProgress } from '@mui/material';
import { useProfile } from '../../hooks/useProfile';
import { useBadge } from '../../hooks/useBadge';

const ProfileView = () => {
  const { profile, isLoaded: isProfileLoaded } = useProfile();
  const { badge, isLoaded: isBadgeLoaded } = useBadge();

  if (!isProfileLoaded || !isBadgeLoaded) {
    return <CircularProgress />;
  }
  return (
    <div className='panel-contents'>
      <ContentBox>
        <div>{profile.user.bio}</div>
      </ContentBox>
      <ContentBox>
        <div>{profile.user.email}</div>
      </ContentBox>
      <ContentBox>
        <div>hi2</div>
      </ContentBox>
      <ContentBox></ContentBox>
      <SVG width={270} height={135} viewBox='0 0 350 170' src={badge} />
    </div>
  );
};

export default ProfileView;
