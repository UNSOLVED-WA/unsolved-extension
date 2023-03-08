import React from 'react';
import Box from './Box';
import { ContentBox, Recommand, Flex } from '../../../../common';
import { useTeam, useRandomRecommandProblem, useUserTeam } from '../../../../hooks';
import { numberToTier, redirectProblemInfo } from '../../../../util';

const UnsolvedProfileBox = () => {
  const { team, isLoaded: isTeamLoaded, isFailed: isTeamFailed, showGuide } = useTeam();
  const { randomRecommand, isLoaded, isFailed, refresh } = useRandomRecommandProblem(team);
  const { solvingCount } = useUserTeam(isTeamLoaded, isTeamFailed);

  return (
    <>
      <Box title='Unsolved Profile' isLoaded={isTeamLoaded} isFailed={isTeamFailed} fallback='info' fallbackAction={showGuide}>
        <Flex direction='row' divided='two'>
          <b>Solving Count</b>
          <div>{solvingCount < 0 ? 'default' : solvingCount}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Ranking</b>
          <div>기능 추가 예정</div>
        </Flex>
      </Box>
      {team && (
        <Box isLoaded={isLoaded} isFailed={isFailed} customBox={true} fallback='error' fallbackAction={refresh}>
          <ContentBox color={numberToTier(randomRecommand?.tier).tier} pointer={true}>
            <Recommand onClick={() => redirectProblemInfo(randomRecommand?.problemId)}>
              <Flex direction='column' gap='0px' align='start'>
                <Flex direction='row' justify='space-between'>
                  <span className='problem-id'>No.{randomRecommand?.problemId}</span>
                  <span className='problem-tier'>
                    {numberToTier(randomRecommand?.tier).tier + ' ' + numberToTier(randomRecommand?.tier).level}
                  </span>
                </Flex>
                <span className='problem-title'>{randomRecommand?.problemTitle}</span>
              </Flex>
            </Recommand>
          </ContentBox>
        </Box>
      )}
    </>
  );
};

export default UnsolvedProfileBox;
