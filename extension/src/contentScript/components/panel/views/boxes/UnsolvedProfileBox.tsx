import React from 'react';
import Box from './Box';
import { Flex } from '../../../../common';
import { useTeam } from '../../../../hooks';

const UnsolvedProfileBox = () => {
  const { isLoaded, isFailed, refresh } = useTeam();
  return (
    <Box title='Unsolved Profile' isLoaded={isLoaded} isFailed={isFailed} fallback='info' fallbackAction={refresh}>
      <Flex direction='row' divided='two'>
        <b>Solving Count</b>
        <div>3</div>
      </Flex>
      <Flex direction='row' divided='two'>
        <b>Ranking</b>
        <div>10</div>
      </Flex>
    </Box>
  );
};

export default UnsolvedProfileBox;
