import React, { useEffect, useState } from 'react';
import { ProblemResponse } from '../../../@types/Problem';
import { ContentBox } from '../../common';

const RecommandView = () => {
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);

  const redirectProblemInfo = (data: number) => (window.location.href = `https://www.acmicpc.net/problem/${data}`);

  useEffect(() => {
    // TODO: 추천 문제 갖고오는 message
    chrome.runtime.sendMessage({ message: 'fetchRecommand', type: 'async', data: { teamId: '1', tier: '1' } }, (response) => {
      if (response.state === 'success') {
        setRecommand(response.data);
      }
    });
  }, []);

  return (
    <div className='panel-contents'>
      {recommand.map((problem) => (
        <ContentBox key={problem.problemId} color='bronze'>
          <div onClick={() => redirectProblemInfo(problem.problemId)}>
            <div>{problem.problemId}</div>
            <div>{problem.problemTitle}</div>
            <div>{problem.tier}</div>
          </div>
        </ContentBox>
      ))}
    </div>
  );
};

export default RecommandView;
