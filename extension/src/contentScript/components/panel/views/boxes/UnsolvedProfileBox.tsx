import React from 'react';
import Box from './Box';
import { Flex } from '../../../../common';

interface Props {
  isLoaded: boolean;
  isFailed: boolean;
  refresh: () => void;
}

const UnsolvedProfileBox = ({ isLoaded, isFailed, refresh }: Props) => {
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
