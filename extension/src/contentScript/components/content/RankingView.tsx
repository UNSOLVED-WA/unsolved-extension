import React, { useEffect, useState } from 'react';
import { Ranking } from '../../../@types/Ranking';
import { ContentBox } from '../../common';

const RankingView = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchRanking', type: 'async' }, (response) => {
      if (response.state === 'success') {
        setRanking(response.data);
      }
    });
  }, []);

  return (
    <div className='panel-contents'>
      {ranking.map((user) => (
        <ContentBox key={user.teamName + user.bojId}>
          <div>{user.bojId}</div>
          <div>{user.score}</div>
        </ContentBox>
      ))}
    </div>
  );
};

export default RankingView;
