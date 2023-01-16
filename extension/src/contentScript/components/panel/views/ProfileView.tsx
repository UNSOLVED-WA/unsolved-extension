import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { CircularProgress } from '@mui/material';
import { ContentBox, RecommandBox, Flex } from '../../../common';
import { RadioButtonChecked, RadioButtonUnChecked } from '../../../common/icons';
import { useBadge, useRandomRecommandProblem, useRefresh } from '../../../hooks';
import { MessageManager } from '../../../../utils';
import { numberToTier } from '../../../util';
import { Profile } from '../../../../@types';

interface Props {
  profile: Profile;
}

const ProfileView = ({ profile }: Props) => {
  const [isChangeOrganization, setIsChangeOrganization] = useState(false);
  const { isRefresh, refresh } = useRefresh();
  const { randomRecommand, isLoaded: isProblemLoaded, isFailed: isProblemFailed } = useRandomRecommandProblem(isRefresh);
  const { badge, isLoaded: isBadgeLoaded, isFailed: isBadgeFailed } = useBadge(isRefresh);

  const handleChangeOrganizationButtonTabbed = () => setIsChangeOrganization((prev) => !prev);

  const redirectUserInfo = (bojId: string) => {
    MessageManager.send({ message: 'toRedirectUser', type: 'sync', requestData: { bojId } });
  };
  const redirectProblemInfo = (problemId: number) => {
    MessageManager.send({ message: 'toRedirectProblem', type: 'sync', requestData: { problemId } });
  };

  if (!isProblemLoaded || !isBadgeLoaded) return <CircularProgress />;
  if (isProblemFailed || isBadgeFailed) {
    return (
      <div className='panel-contents'>
        <ContentBox defined='error' definedAction={refresh} />
      </div>
    );
  }
  return (
    <div className='panel-contents'>
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
            <div>{profile.user.exp.toLocaleString('ko-KR')}</div>
          </Flex>
        </div>
      </ContentBox>
      <ContentBox
        title={
          <Flex direction='row' justify='space-between'>
            <b>Organization info</b>
            <button className='organizations-change-button' onClick={handleChangeOrganizationButtonTabbed}>
              변경
            </button>
          </Flex>
        }
      >
        {isChangeOrganization ? (
          <ul className='organizations'>
            {profile.getOrganizations().map((organization) => (
              <li
                key={organization.name}
                className='organization'
                onClick={() => {
                  profile.setOrganization(organization.name);
                  handleChangeOrganizationButtonTabbed();
                }}
              >
                <span>{organization.name}</span>
                {organization.name === profile.getOrganization().name ? <RadioButtonChecked /> : <RadioButtonUnChecked />}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Flex direction='row' divided='two'>
              <b>Name</b>
              <div>{profile.getOrganization().name}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>User Count</b>
              <div>{profile.getOrganization().userCount.toLocaleString('ko-KR')}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>Rating</b>
              <div>{profile.getOrganization().rating.toLocaleString('ko-KR')}</div>
            </Flex>
          </>
        )}
      </ContentBox>
      {profile.isOrganizationRegistered() ? (
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
      ) : (
        <ContentBox defined='error' definedAction={refresh} />
      )}
      <ContentBox color={numberToTier(randomRecommand.tier).tier} pointer={true}>
        <RecommandBox onClick={() => redirectProblemInfo(randomRecommand.problemId)}>
          <Flex direction='column' gap='0px' align='start'>
            <Flex direction='row' justify='space-between'>
              <span className='problem-id'>No.{randomRecommand.problemId}</span>
              <span className='problem-tier'>
                {numberToTier(randomRecommand.tier).tier + ' ' + numberToTier(randomRecommand.tier).level}
              </span>
            </Flex>
            <span className='problem-title'>{randomRecommand.problemTitle}</span>
          </Flex>
        </RecommandBox>
      </ContentBox>
      <SVG width={270} height={135} viewBox='0 0 350 170' src={badge} />
    </div>
  );
};

export default ProfileView;
