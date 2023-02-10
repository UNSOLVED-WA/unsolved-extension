import React from 'react';
import { ContentBox, Recommand, Flex } from '../../../../common';
import Box from './Box';
import { useRandomRecommandProblem } from '../../../../hooks';
import { numberToTier, redirectProblemInfo } from '../../../../util';
import { Team } from '../../../../../@types';

interface Props {
  team: Team;
}

const RandomRecommandBox = ({ team }: Props) => {
  const { randomRecommand, isLoaded, isFailed, refresh } = useRandomRecommandProblem(team);

  return (
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
  );
};

export default RandomRecommandBox;
