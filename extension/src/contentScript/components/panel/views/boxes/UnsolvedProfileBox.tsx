import React, { useEffect, useState } from 'react';
import Box from './Box';
import { Flex } from '../../../../common';
import { useTeam } from '../../../../hooks';
import { MessageManager } from '../../../../../utils';

const UnsolvedProfileBox = () => {
  const { isLoaded, isFailed, refresh } = useTeam();
  const [solvingCount, setSolvingCount] = useState(-1);

  useEffect(() => {
    if (isLoaded && !isFailed) {
      MessageManager.send({ message: 'fetchUnsolvedUser', type: 'async' }, (response) => {
        if (response.state === 'success') {
          // user exists
          setSolvingCount(response.responseData.unsolvedUser.solvingCount);
        } else {
          // user does not exist
          MessageManager.send({ message: 'createUnsolvedUser', type: 'async' }, (response) => {
            if (response.state === 'success') {
              setSolvingCount(response.responseData.unsolvedUser.solvingCount);
            } else {
              console.log('fail createUnsolvedUser : ', response.errorMessage);
            }
          });
        }
      });
    }
  }, [isLoaded, isFailed, refresh]);

  return (
    <Box title='Unsolved Profile' isLoaded={isLoaded} isFailed={isFailed} fallback='info' fallbackAction={refresh}>
      <Flex direction='row' divided='two'>
        <b>Solving Count</b>
        <div>{solvingCount < 0 ? 'default' : solvingCount}</div>
      </Flex>
      <Flex direction='row' divided='two'>
        <b>Ranking</b>
        <div>기능 추가 예정</div>
      </Flex>
    </Box>
  );
};

export default UnsolvedProfileBox;
