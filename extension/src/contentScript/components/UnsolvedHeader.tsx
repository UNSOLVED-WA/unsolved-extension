import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { fadeIn } from '../style/animation.style';

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

type Props = {
  handlePanelClose: () => void;
};

const UnsolvedHeader = ({ handlePanelClose }: Props) => {
  return (
    <Container onClick={handlePanelClose}>
      <CloseIcon sx={{ width: '100%', height: '100%' }} />
    </Container>
  );
};

export default UnsolvedHeader;
