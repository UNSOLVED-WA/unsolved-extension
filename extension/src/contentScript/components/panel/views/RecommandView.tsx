import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { ContentBox, RecommandBox, Flex } from '../../../common';
import { ExpandLessIcon, ExpandMoreIcon } from '../../../common/icons';
import { useRecommandProblems } from '../../../hooks';
import { MessageManager } from '../../../../utils';
import { numberToTier, tiers } from '../../../util';

interface Props {
  selectedTiers: number[];
  changeTiers: (tier: number) => void;
}

const FilterBox = ({ selectedTiers, changeTiers }: Props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleExpandButtonTabbed = () => setIsFilterOpen((prev) => !prev);
  const handleFilterClose = () => setIsFilterOpen(false);
  const sortTier = (tiers: number[]) => tiers.sort((a, b) => a - b);

  return (
    <ContentBox>
      <Filter isFilterOpen={isFilterOpen}>
        <div id='filter-title'>
          <Flex direction='row'>
            <div>
              <span className='title'>선택한 티어 :</span>
              {sortTier(selectedTiers).map((selectedTier) => {
                const st = numberToTier(selectedTier);
                return (
                  <span key={'filter-title-' + st.tier} className={'title ' + st.tier}>
                    {' ' + st.tier.toLocaleUpperCase() + ' ' + st.level?.toString()}
                  </span>
                );
              })}
            </div>
            <button className='expand' onClick={handleExpandButtonTabbed}>
              {isFilterOpen ? <ExpandLessIcon height='20' width='20' /> : <ExpandMoreIcon height='20' width='20' />}
            </button>
          </Flex>
        </div>
        <div id='filter-selector'>
          <div id='filter-padding' />
          {sortTier(tiers).map((tier) => {
            const t = numberToTier(tier);
            return (
              <button
                className={`tiers ${t.tier}`.concat(selectedTiers.includes(tier) ? ' selected' : '')}
                key={'tier-' + tier}
                onClick={() => {
                  handleFilterClose();
                  changeTiers(tier);
                }}
              >
                {t.tier.substring(0, 1).toUpperCase() + t.level?.toString()}
              </button>
            );
          })}
        </div>
      </Filter>
    </ContentBox>
  );
};

const RecommandView = () => {
  const { recommand, selectedTiers, refresh, changeTiers, isLoaded, isFailed } = useRecommandProblems();

  const redirectProblemInfo = (problemId: number) => {
    MessageManager.send({ message: 'toRedirectProblem', type: 'sync', requestData: { problemId } });
  };

  if (isFailed) {
    return (
      <div className='panel-contents'>
        <ContentBox defined='error' definedAction={refresh} />
      </div>
    );
  }
  return (
    <div className='panel-contents'>
      <FilterBox selectedTiers={selectedTiers} changeTiers={changeTiers} />
      {!isLoaded ? (
        <ContentBox>
          <CircularProgress />
        </ContentBox>
      ) : recommand.length === 0 ? (
        <ContentBox color={numberToTier(selectedTiers[0]).tier}>
          <Flex justify='center' align='center'>
            All Solved!
          </Flex>
        </ContentBox>
      ) : (
        recommand.map(({ problemId, problemTitle, tier }) => {
          const tierInfo = numberToTier(tier);
          return (
            <ContentBox key={problemId} color={tierInfo.tier} pointer={true}>
              <RecommandBox onClick={() => redirectProblemInfo(problemId)}>
                <Flex direction='column' gap='0px' align='start'>
                  <Flex direction='row' justify='space-between'>
                    <span className='problem-id'>No.{problemId}</span>
                    <span className='problem-tier'>{tierInfo.tier + ' ' + tierInfo.level}</span>
                  </Flex>
                  <span className='problem-title'>{problemTitle}</span>
                </Flex>
              </RecommandBox>
            </ContentBox>
          );
        })
      )}
    </div>
  );
};

export default RecommandView;

const Filter = styled.div<{ isFilterOpen: boolean }>`
  #filter-title {
    .title {
      font-weight: 600;
      margin: 0;
      padding: 0;
    }
    .expand {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  #filter-padding {
    width: 100%;
    height: 10px;
  }
  #filter-selector {
    overflow: hidden;
    max-height: ${(props) => (props.isFilterOpen ? '300px' : '0px')};
    transition: max-height 0.25s linear;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* gap: 10px 10px; */

    .tiers {
      margin: 4px 8px;
      padding: 1px 8px;
      cursor: pointer;

      border-radius: 100px;
      border: 0px;
      box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px 1px;
    }
  }
  .bronze {
    color: #592401;
  }
  .bronze.selected {
    background: #592401;
  }
  .silver {
    color: #263548;
  }
  .silver.selected {
    background: #263548;
  }
  .gold {
    color: #d46d1c;
  }
  .gold.selected {
    background: #d46d1c;
  }
  .platinum {
    color: #439983;
  }
  .platinum.selected {
    background: #439983;
  }
  .diamond {
    color: #3c95d2;
  }
  .diamond.selected {
    background: #3c95d2;
  }
  .ruby {
    color: #bb0047;
  }
  .ruby.selected {
    background: #bb0047;
  }
  .selected {
    color: #ffffff;
  }
`;
