import React, { useEffect, useState } from 'react';
import { ProblemResponse } from '../../../@types/Problem';
import { ContentBox, Flex } from '../../common';
import styled from '@emotion/styled';
import { numberToTier } from '../../utils/numberToTier';

const RecommandView = () => {
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);

  const redirectProblemInfo = (problemId: number) => {
    chrome.runtime.sendMessage({ message: 'toRedirectProblem', type: 'sync', data: problemId });
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchRecommand', type: 'async', data: { teamId: '1', tier: '1' } }, (response) => {
      if (response.state === 'success') {
        setRecommand(response.data);
      }
    });
  }, []);

  return (
    <div className='panel-contents'>
      {recommand.map((problem) => {
        const { problemId, problemTitle, tier } = problem;
        const tierInfo = numberToTier(tier);
        return (
          <ContentBox key={problemId} color={tierInfo.tier}>
            <ReccomandBox onClick={() => redirectProblemInfo(problemId)}>
              <Flex direction='column' gap='0px' align='start'>
                <Flex direction='row' justify='space-between'>
                  <span className='problem-id'>No.{problemId}</span>
                  <span className='problem-tier'>{tierInfo.tier + ' ' + tierInfo.level}</span>
                </Flex>
                <span className='problem-title'>{problemTitle}</span>
              </Flex>
            </ReccomandBox>
          </ContentBox>
        );
      })}
    </div>
  );
};

export default RecommandView;

const ReccomandBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  .problem-id,
  .problem-tier {
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
  }
  .problem-title {
    width: 100%;
    overflow: 'hidden';
    white-space: 'nowrap';
    text-overflow: 'ellipsis';
  }
`;
