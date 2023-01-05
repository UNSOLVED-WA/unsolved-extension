import React, { useEffect, useState } from 'react';
import { ContentBox, Flex } from '../../../common';
import { Message, Storage } from '../../../../utils';
import { numberToTier } from '../../../utils';
import { tiers } from '../../../utils/numberToTier';
import styled from '@emotion/styled';
import { useRecommandProblems } from '../../../hooks/useRecommandProblems';
import { CircularProgress } from '@mui/material';
import { useRandomRecommandProblem } from '../../../hooks/useRandomRecommandProblem';

interface Props {
  refresh: () => void;
}

const RecommandView = ({ refresh }: Props) => {
  const { recommand, isLoaded: isLoadedProblems, isFailed: isFailedProblems } = useRecommandProblems();
  const { randomRecommand, isLoaded: isLoadedProblem, isFailed: isFailedProblem } = useRandomRecommandProblem();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);

  const handleFilter = () => setIsFilterOpen((prev) => !prev);
  const redirectProblemInfo = (problemId: number) => {
    Message.send({ message: 'toRedirectProblem', type: 'sync', data: problemId });
  };
  const handleTierClick = (tier: number, selectedTiers: number[]) => {
    let _selectedTiers = selectedTiers;
    if (selectedTiers.includes(tier)) {
      _selectedTiers = selectedTiers.filter((t) => t !== tier);
    } else {
      _selectedTiers = [...selectedTiers, tier];
    }
    Storage.set('selectedTiers', _selectedTiers, (result) => {
      setSelectedTiers(result);
    });
  };
  const sortTier = (tiers: number[]) => {
    return tiers.sort((a, b) => a - b);
  };

  useEffect(() => {
    Storage.get('selectedTiers', (result) => {
      if (result) setSelectedTiers(result);
    });
  }, []);

  if (!isLoadedProblems || !isLoadedProblem) return <CircularProgress />;
  if (isFailedProblems || isFailedProblem) {
    return (
      <div className='panel-contents'>
        <ContentBox defined='error' definedAction={refresh} />
      </div>
    );
  }
  return (
    <div className='panel-contents'>
      <ContentBox
        title={
          <Flex direction='row'>
            <div>
              <Flex>
                {sortTier(selectedTiers).map((selectedTier) => {
                  const st = numberToTier(selectedTier);
                  return <div key={'selectedTier-' + selectedTier}>{st.tier.substring(0, 1).toUpperCase() + st.level?.toString()}</div>;
                })}
              </Flex>
            </div>
            <button onClick={handleFilter}>{isFilterOpen ? '-' : '+'}</button>
          </Flex>
        }
      >
        <FilterBox isFilterOpen={isFilterOpen}>
          {sortTier(tiers).map((tier) => {
            const t = numberToTier(tier);
            return (
              <button
                className={'tiers'.concat(selectedTiers.includes(tier) ? ' selected' : '')}
                key={'tier-' + tier}
                onClick={() => handleTierClick(tier, selectedTiers)}
              >
                {t.tier.substring(0, 1).toUpperCase() + t.level?.toString()}
              </button>
            );
          })}
        </FilterBox>
      </ContentBox>
      {recommand.map(({ problemId, problemTitle, tier }) => {
        const tierInfo = numberToTier(tier);
        return (
          <ContentBox key={problemId} color={tierInfo.tier} pointer={true}>
            <ReccomandBox onClick={() => redirectProblemInfo(problemId)}>
              <Flex direction='column' gap='0px' align='start'>
                <Flex direction='row' justify='space-between'>
                  <span className='problem-id'>No.{problemId}</span>
                  <span className='problem-tier'>{tierInfo.tier + ' ' + tierInfo.level}</span>
                </Flex>
                <span className='problem-title'>{problemTitle}</span>
              </Flex>
            </ReccomandBox>
          </ContentBox>
        );
      })}
    </div>
  );
};

export default RecommandView;

const ReccomandBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  .problem-id,
  .problem-tier {
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
  }
  .problem-title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const FilterBox = styled.div<{ isFilterOpen: boolean }>`
  overflow: hidden;
  max-height: ${(props) => (props.isFilterOpen ? '100px' : '0px')};
  transition: max-height 0.25s linear;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .tiers {
    cursor: pointer;
    background: #ffffff;
    color: red;

    border-radius: 100px;
    border: 0px;
  }

  .selected {
    background: red;
    color: #ffffff;
  }
`;
