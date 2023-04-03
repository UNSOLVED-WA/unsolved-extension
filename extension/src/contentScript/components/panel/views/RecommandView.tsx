import React from 'react';
import { useRecommandProblems, useTeam } from '../../../hooks';
import { FilterBox, RecommandBox } from './boxes';
import View from './View';

const RecommandView = () => {
  const { team, isLoaded: isTeamLoaded, isFailed: isTeamFailed, showGuide } = useTeam();
  const { recommand, selectedTiers, refresh, changeTiers, isLoaded, isFailed } = useRecommandProblems(team);

  return (
    <View isLoaded={isTeamLoaded} isFailed={isTeamFailed} fallback='info' fallbackAction={showGuide}>
      <FilterBox selectedTiers={selectedTiers} changeTiers={changeTiers} />
      <RecommandBox recommand={recommand} selectedTiers={selectedTiers} refresh={refresh} isLoaded={isLoaded} isFailed={isFailed} />
    </View>
  );
};

export default RecommandView;
