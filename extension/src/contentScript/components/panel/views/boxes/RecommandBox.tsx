import React from 'react';
import Box from './Box';
import { ContentBox, Flex, Recommand } from '../../../../common';
import { numberToTier, redirectProblemInfo } from '../../../../util';
import { ProblemResponse } from '../../../../../@types';

interface Props {
  recommand: ProblemResponse[];
  selectedTiers: number[];
  isLoaded: boolean;
  isFailed: boolean;
  refresh: () => void;
}

const RecommandBox = ({ recommand, selectedTiers, isLoaded, isFailed, refresh }: Props) => {
  return (
    <Box isLoaded={isLoaded} isFailed={isFailed} fallback='error' fallbackAction={refresh} customBox={true}>
      {recommand.length === 0 ? (
        <ContentBox color={numberToTier(selectedTiers[0]).tier}>
          <Flex justify='center' align='center'>
            All Solved!
          </Flex>
        </ContentBox>
      ) : (
        recommand.map(({ problemId, problemTitle, tier }) => {
          const tierInfo = numberToTier(tier);
          return (
            <ContentBox key={'r-' + problemId} color={tierInfo.tier} pointer={true}>
              <Recommand onClick={() => redirectProblemInfo(problemId)}>
                <Flex direction='column' gap='0px' align='start'>
                  <Flex direction='row' justify='space-between'>
                    <span className='problem-id'>No.{problemId}</span>
                    <span className='problem-tier'>{tierInfo.tier + ' ' + tierInfo.level}</span>
                  </Flex>
                  <span className='problem-title'>{problemTitle}</span>
                </Flex>
              </Recommand>
            </ContentBox>
          );
        })
      )}
    </Box>
  );
};

export default RecommandBox;
