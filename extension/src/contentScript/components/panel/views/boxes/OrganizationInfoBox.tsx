import React, { useState } from 'react';
import { Flex } from '../../../../common';
import Box from './Box';
import { RadioButtonChecked, RadioButtonUnChecked } from '../../../../common/icons';
import { useOrganization } from '../../../../hooks';

const OrganizationInfoBox = () => {
  const { organizations, selectedOrganization, changeSelectedOrganization, isFailed, isLoaded } = useOrganization();
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
      isFailed={isFailed}
      isLoaded={isLoaded}
      fallback='error'
    >
      <div className={'responsible-height ' + (isChangeOrganization ? `activate ${responsibleHeightSize(organizations.length)}` : '')}>
        {isChangeOrganization ? (
          <ul className='organizations'>
            {organizations.map((organization) => (
              <li
                key={organization.name}
                className='organization'
                onClick={() => {
                  changeSelectedOrganization(organization);
                  handleChangeOrganizationButtonTabbed();
                }}
              >
                <span>{organization.name}</span>
                {organization.name === selectedOrganization?.name ? <RadioButtonChecked /> : <RadioButtonUnChecked />}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Flex direction='row' divided='two'>
              <b>Name</b>
              <div>{selectedOrganization?.name}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>User Count</b>
              <div>{selectedOrganization?.userCount.toLocaleString('ko-KR')}</div>
            </Flex>
            <Flex direction='row' divided='two'>
              <b>Rating</b>
              <div>{selectedOrganization?.rating.toLocaleString('ko-KR')}</div>
            </Flex>
          </>
        )}
      </div>
    </Box>
  );
};

export default OrganizationInfoBox;
