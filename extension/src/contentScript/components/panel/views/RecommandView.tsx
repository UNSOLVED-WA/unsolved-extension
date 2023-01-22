import React from 'react';
import { useRecommandProblems, useTeam } from '../../../hooks';
import { FilterBox, RecommandBox } from './boxes';
import View from './View';

const RecommandView = () => {
  const { recommand, selectedTiers, refresh, changeTiers, isLoaded, isFailed } = useRecommandProblems();
  const { isLoaded: isTeamLoaded, isFailed: isTeamFailed } = useTeam();

  return (
    <View isLoaded={isTeamLoaded} isFailed={isTeamFailed} fallback='info'>
      <FilterBox selectedTiers={selectedTiers} changeTiers={changeTiers} />
      <RecommandBox recommand={recommand} selectedTiers={selectedTiers} refresh={refresh} isLoaded={isLoaded} isFailed={isFailed} />
    </View>
  );
};

export default RecommandView;
