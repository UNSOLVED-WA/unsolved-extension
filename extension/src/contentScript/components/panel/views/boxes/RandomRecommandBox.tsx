import React from 'react';
import { ContentBox, Recommand, Flex } from '../../../../common';
import Box from './Box';
import { useRandomRecommandProblem } from '../../../../hooks';
import { MessageManager } from '../../../../../utils';
import { numberToTier } from '../../../../util';

const RandomRecommandBox = () => {
  const { randomRecommand, isLoaded, isFailed, refresh } = useRandomRecommandProblem();
  const redirectProblemInfo = (problemId: number) => {
    MessageManager.send({ message: 'toRedirectProblem', type: 'sync', requestData: { problemId } });
  };
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
