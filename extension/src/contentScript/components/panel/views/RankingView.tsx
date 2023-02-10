import React from 'react';
import View from './View';
import { RankingBox } from './boxes';
import { useTeam } from '../../../hooks';

const RankingView = () => {
  const { team, isLoaded, isFailed } = useTeam();

  return (
    <View isLoaded={isLoaded} isFailed={isFailed} fallback='info'>
      <RankingBox team={team} />
    </View>
  );
};

export default RankingView;
