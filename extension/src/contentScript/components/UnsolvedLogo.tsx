import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LogoSize } from '../types/types';

const unwa_logo_medium = css`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 7.5px;
`;

const unwa_logo_large = css`
  height: 24px;

  font-size: 20px;
  font-weight: 600;
  padding: 5px 7.5px;
`;

const Container = styled.span<{ size: LogoSize }>`
  border-radius: 5px !important;
  background: #ffffff;
  position: relative;
  color: #ff0000;

  ${({ size }) => (size === 'medium' ? unwa_logo_medium : unwa_logo_large)}
`;

const UnsolvedLogo = ({ size }: { size: LogoSize }) => {
  return <Container size={size}>wa</Container>;
};

export default UnsolvedLogo;
