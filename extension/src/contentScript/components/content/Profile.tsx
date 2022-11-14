import React from 'react';
import { ContentBox } from '../../common';

interface props {
  myBjoId: string;
  bio: string;
}

const Profile = ({ myBjoId, bio }: props) => {
  return (
    <>
      <ContentBox>
        <div>백준 id : {myBjoId}</div>
        <div>boi : {bio ? bio : '내용을 채워주세요'}</div>
      </ContentBox>
    </>
  );
};

export default Profile;
