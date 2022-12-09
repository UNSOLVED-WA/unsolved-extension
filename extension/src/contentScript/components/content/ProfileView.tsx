import React from 'react';
import SVG from 'react-inlinesvg';
import { ContentBox, Flex } from '../../common';
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
      <ContentBox title='Solved Profile'>
        <Flex direction='row'>
          <b>ID</b>
          <div>{profile.user.handle}</div>
        </Flex>
        <Flex direction='row'>
          <b>Bio</b>
          <div>{profile.user.bio}</div>
        </Flex>
        <Flex direction='row'>
          <b>Coins</b>
          <div>{profile.user.coins}</div>
        </Flex>
        <Flex direction='row'>
          <b>Exp</b>
          <div>{profile.user.exp}</div>
        </Flex>
      </ContentBox>
      <ContentBox title='Unsolved Profile'>
        <Flex direction='row'>
          <b>Solving Count</b>
          <div>3</div>
        </Flex>
        <Flex direction='row'>
          <b>Ranking</b>
          <div>10</div>
        </Flex>
      </ContentBox>
      <ContentBox title='Organization Info'>
        <Flex direction='row'>
          <b>Name</b>
          <div>{profile.user.organizations[0].name}</div>
        </Flex>
        <Flex direction='row'>
          <b>User Count</b>
          <div>{profile.user.organizations[0].userCount}</div>
        </Flex>
        <Flex direction='row'>
          <b>Rating</b>
          <div>{profile.user.organizations[0].rating}</div>
        </Flex>
      </ContentBox>

      <SVG width={270} height={135} viewBox='0 0 350 170' src={badge} />
    </div>
  );
};

export default ProfileView;
