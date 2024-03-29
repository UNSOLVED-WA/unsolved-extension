import React from 'react';
import View from './View';
import { ScoringBox } from './boxes';
import { useTeam } from '../../../hooks';

const ScoringView = () => {
  const { isLoaded, isFailed, showGuide } = useTeam();

  return (
    <View isLoaded={isLoaded} isFailed={isFailed} fallback='info' fallbackAction={showGuide} style={{ width: '100%', height: '100%' }}>
      <ScoringBox />
    </View>
  );
};

export default ScoringView;
