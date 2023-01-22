import React from 'react';
import { Flex } from '../../../../common';
import { redirectUserInfo } from '../../../../util';
import Box from './Box';
import { User } from '../../../../../@types';

interface Props {
  user: User;
}

const SolvedProfileBox = ({ user }: Props) => {
  return (
    <Box title='Solved Profile'>
      <div onClick={() => redirectUserInfo(user.handle)}>
        <Flex direction='row' divided='two'>
          <b>ID</b>
          <div>{user.handle}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Bio</b>
          <div>{user.bio}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Coins</b>
          <div>{user.coins}</div>
        </Flex>
        <Flex direction='row' divided='two'>
          <b>Exp</b>
          <div>{user.exp.toLocaleString('ko-KR')}</div>
        </Flex>
      </div>
    </Box>
  );
};

export default SolvedProfileBox;
