import React, { useEffect } from 'react';
import { Organization } from '../../../@types/SolvedUser';
import { ContentBox } from '../../common';

interface Props {
  bjoOrganization: Organization[];
}

const Group = ({ bjoOrganization }: Props) => {
  return (
    <>
      {bjoOrganization.length > 0
        ? bjoOrganization.map((item, index) => {
            return (
              <ContentBox key={index}>
                <div>그룹 명 : {item.name}</div>
                <div>그룹 레이팅 : {item.rating}</div>
                <div>그룹 멤버 수 : {item.userCount}</div>
                <div>그룹 순위 : {item.userCount}</div>
              </ContentBox>
            );
          })
        : null}
    </>
  );
};

export default Group;
