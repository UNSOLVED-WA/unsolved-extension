import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  z-index: 10000001;

  cursor: pointer;
`;

type Props = {
  handlePanelClose: () => void;
};

const UnsolvedHeader = ({ handlePanelClose }: Props) => {
  return (
    <Container onClick={handlePanelClose}>
      <CloseIcon />
    </Container>
  );
};

export default UnsolvedHeader;
