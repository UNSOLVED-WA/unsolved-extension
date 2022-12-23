import React, { useEffect, useState } from 'react';
import { ProblemResponse } from '../../../@types/Problem';
import { ContentBox } from '../../common';

const RecommandView = () => {
  const [recommand, setRecommand] = useState<ProblemResponse[]>([]);

  const redirectProblemInfo = (problemId: number) => {
    chrome.runtime.sendMessage({ message: 'toRedirectProblem', type: 'sync', data: problemId });
  };

  const submitPassedProblem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('문제 통과 제출');
  };

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
          <div
            onClick={() => {
              redirectProblemInfo(problem.problemId);
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ minWidth: '20px', backgroundColor: 'gray', borderRadius: '50%', textAlign: 'center' }}>{problem.tier}</div>
            <div style={{ margin: '0 5px' }}>
              <span style={{ display: 'block' }}>{problem.problemId}</span>
              <span style={{ display: 'block', width: '180px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {problem.problemTitle}
              </span>
            </div>
            <button onClick={submitPassedProblem}>제출</button>
          </div>
        </ContentBox>
      ))}
    </div>
  );
};

export default RecommandView;
