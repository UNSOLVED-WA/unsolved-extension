import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { Ranking } from '../../../@types/Ranking';
import { ContentBox } from '../../common';

const RankingView = () => {
  const theme = useTheme();
  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchRanking', type: 'async', data: '1' }, (response) => {
      if (response.state === 'success') {
        setRanking(response.data);
      }
    });
  }, []);

  return (
    <div className='panel-contents'>
      {ranking.map((user) => (
        <ContentBox key={user.teamName + user.bojId} bgColor={theme.tier.bronze}>
          <div>{user.bojId}</div>
          <div>{user.score}</div>
        </ContentBox>
      ))}
    </div>
  );
};

export default RankingView;
