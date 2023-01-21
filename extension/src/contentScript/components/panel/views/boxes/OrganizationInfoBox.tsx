import React, { useState } from 'react';
import { Profile } from '../../../../../@types';
import { Flex } from '../../../../common';
import Box from './Box';
import { RadioButtonChecked, RadioButtonUnChecked } from '../../../../common/icons';

interface Props {
  profile: Profile;
}

const OrganizationInfoBox = ({ profile }: Props) => {
  const [isChangeOrganization, setIsChangeOrganization] = useState(false);

  const handleChangeOrganizationButtonTabbed = () => setIsChangeOrganization((prev) => !prev);
  const responsibleHeightSize = (length: number) => {
    if (length > 3) return 'long';
    if (length > 2) return 'short';
    return 'shortest';
  };

  return (
    <Box
      title={
        <Flex direction='row' justify='space-between'>
          <b>Organization info</b>
          <button className='organizations-change-button' onClick={handleChangeOrganizationButtonTabbed}>
            변경
          </button>
        </Flex>
      }
    >
      <div
        className={
          'responsible-height ' + (isChangeOrganization ? `activate ${responsibleHeightSize(profile.user.organizations.length)}` : '')
        }
      >
        {isChangeOrganization ? (
          <ul className='organizations'>
            {profile.getOrganizations().map((organization) => (
              <li
                key={organization.name}
                className='organization'
                onClick={() => {
                  profile.setOrganization(organization.name);
                  handleChangeOrganizationButtonTabbed();
                }}
              >
                <span>{organization.name}</span>
                {organization.name === profile.getOrganization().name ? <RadioButtonChecked /> : <RadioButtonUnChecked />}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Flex direction='row' divided='two'>
              <b>Name</b>
              <div>{profile.getOrganization().name}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>User Count</b>
              <div>{profile.getOrganization().userCount.toLocaleString('ko-KR')}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>Rating</b>
              <div>{profile.getOrganization().rating.toLocaleString('ko-KR')}</div>
            </Flex>
          </>
        )}
      </div>
    </Box>
  );
};

export default OrganizationInfoBox;
