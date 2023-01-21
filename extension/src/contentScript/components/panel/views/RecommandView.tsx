import React from 'react';
import { useRecommandProblems } from '../../../hooks';
import { FilterBox, RecommandBox } from './boxes';
import View from './View';

const RecommandView = () => {
  const { recommand, selectedTiers, refresh, changeTiers, isLoaded, isFailed } = useRecommandProblems();

  return (
    <View>
      <FilterBox selectedTiers={selectedTiers} changeTiers={changeTiers} />
      <RecommandBox recommand={recommand} selectedTiers={selectedTiers} refresh={refresh} isLoaded={isLoaded} isFailed={isFailed} />
    </View>
  );
};

export default RecommandView;
