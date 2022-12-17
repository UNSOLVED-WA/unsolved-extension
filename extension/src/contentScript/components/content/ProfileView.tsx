import React from 'react';
import SVG from 'react-inlinesvg';
import { ContentBox, Flex } from '../../common';
import { CircularProgress } from '@mui/material';
import { useProfile } from '../../hooks/useProfile';
import { useBadge } from '../../hooks/useBadge';

interface Props {
  refresh: () => void;
}

const ProfileView = ({ refresh }: Props) => {
  const { profile, isLoaded: isProfileLoaded } = useProfile();
  const { badge, isLoaded: isBadgeLoaded } = useBadge();

  const redirectUserInfo = (bojId: string) => {
    chrome.runtime.sendMessage({ message: 'toRedirectUser', type: 'sync', data: bojId });
  };

  if (!isProfileLoaded || !isBadgeLoaded) {
    return <CircularProgress />;
  }

  return (
    <div className='panel-contents'>
      <ContentBox defined='error' definedAction={refresh} />
      <ContentBox title='Solved Profile'>
        <div onClick={() => redirectUserInfo(profile.user.handle)}>
          <Flex direction='row' divided='two'>
            <b>ID</b>
            <div>{profile.user.handle}</div>
          </Flex>
          <Flex direction='row' divided='two'>
            <b>Bio</b>
            <div>{profile.user.bio}</div>
          </Flex>
          <Flex direction='row' divided='two'>
            <b>Coins</b>
            <div>{profile.user.coins}</div>
          </Flex>
          <Flex direction='row' divided='two'>
            <b>Exp</b>
            <div>{profile.user.exp}</div>
          </Flex>
        </div>
      </ContentBox>
      <ContentBox title='Unsolved Profile'>
        <Flex direction='row' divided='two'>
          <b>Solving Count</b>
          <div>3</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Ranking</b>
          <div>10</div>
        </Flex>
      </ContentBox>
      <ContentBox title='Organization Info'>
        <Flex direction='row' divided='two'>
          <b>Name</b>
          <div>{profile.user.organizations[0].name}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>User Count</b>
          <div>{profile.user.organizations[0].userCount}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Rating</b>
          <div>{profile.user.organizations[0].rating}</div>
        </Flex>
      </ContentBox>
      <SVG width={270} height={135} viewBox='0 0 350 170' src={badge} />
    </div>
  );
};

export default ProfileView;
