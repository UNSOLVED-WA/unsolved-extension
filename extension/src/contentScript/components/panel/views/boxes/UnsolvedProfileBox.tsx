import React from 'react';
import Box from './Box';
import { ContentBox, Recommand, Flex } from '../../../../common';
import { numberToTier, redirectProblemInfo } from '../../../../util';
import { useRandomRecommandProblem, useTeam } from '../../../../hooks';

const UnsolvedProfileBox = () => {
  const { team, openGuide } = useTeam();
  const { randomRecommand, isLoaded, isFailed, refresh } = useRandomRecommandProblem(team);
  return (
    <>
      <Box title='Unsolved Profile' isLoaded={isLoaded} isFailed={isFailed} fallback='info' fallbackAction={openGuide}>
        <Flex direction='row' divided='two'>
          <b>Solving Count</b>
          <div>3</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Ranking</b>
          <div>10</div>
        </Flex>
      </Box>
      {team !== null ?? (
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
