import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: start;
  align-items: center;

  left: 0px;
  padding-left: 60px;
  border-radius: 15px 15px 0 0 !important;

  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(60px);

  h1 {
    padding: 0px;
    margin: 0px;
    margin-left: 15px;
    font-size: 20px;
  }
`;

interface Props {
  title: string;
}

const ContentPanelHeader = ({ title }: Props) => {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
};

export default ContentPanelHeader;
