import React from 'react';
import { MessageManager } from '../../../../../utils';
import { Flex } from '../../../../common';
import Box from './Box';
import { User } from '../../../../../@types';

interface Props {
  user: User;
}

const SolvedProfileBox = ({ user }: Props) => {
  const redirectUserInfo = (bojId: string) => {
    MessageManager.send({ message: 'toRedirectUser', type: 'sync', requestData: { bojId } });
  };
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
