import React from 'react';
import styled from '@emotion/styled';
import { fadeIn } from '../../style/animation';

type Props = {
  handlePanelClose: () => void;
};

const UWHeader = ({ handlePanelClose }: Props) => {
  return (
    <Container onClick={handlePanelClose}>
      <span className='material-symbols-outlined'>close</span>
    </Container>
  );
};

export default UWHeader;

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 24px;
  height: 24px;
  z-index: 10000001;

  cursor: pointer;

  animation: ${fadeIn} 0.75s ease-in-out forwards;
`;
