import React from 'react';
import styled from '@emotion/styled';

const ContentPanelFooter = () => {
  return (
    <Container>
      <h1>@unsolved.wa</h1>
      <div className='links'>
        <a href='https://github.com/unsolved-wa'>Github</a>
        <span> | </span>
        <a href='https://google.com'>blog</a>
        <span> | </span>
      </div>
    </Container>
  );
};

export default ContentPanelFooter;

const Container = styled.div`
  width: 100%;

  padding: 5px 0;
  display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;

  h1 {
    padding: 0px;
    margin: 0px;
    font-size: 12px;
    font-weight: 600;
  }

  .links > a {
    font-size: 8px;
  }
`;
