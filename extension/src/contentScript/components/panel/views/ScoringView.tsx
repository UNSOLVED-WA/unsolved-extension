import React from 'react';
import View from './View';
import { ScoringBox } from './boxes';

const ScoringView = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <ScoringBox />
    </View>
  );
};

export default ScoringView;
