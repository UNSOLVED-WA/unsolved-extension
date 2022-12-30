import React from 'react';
import styled from '@emotion/styled';
import { fadeIn } from '../style/animation.style';
import { Message } from '../../utils/message';

const Container = styled.div`
  border-radius: 15px !important;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('	https://static.solved.ac/site_main_graphic_1.png');
  background-size: center;
  background-position: center;
  animation: ${fadeIn} 0.75s ease-in-out forwards;

  &::before {
    content: '';
    position: absolute;
    border-radius: 15px !important;
    width: 100%;
    height: 100%;

    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1));
    z-index: -1;
  }

  & > button {
    padding: 0.5rem 1rem;
    margin: 0px 30px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border: 1px solid #ffffff;
    background: transparent;
    border-radius: 5px !important;
    cursor: pointer;
  }

  & > button:hover {
    background: #21c92d;
  }

  & > button > img {
    width: 150px;
    height: 30px;
    border: 0px;
  }

  & > button > span {
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
  }
`;

const LoginPanel = () => {
  function handleLoginButtonClick() {
    Message.send({ message: 'toLogin', type: 'sync' });
  }
  return (
    <Container>
      <button onClick={handleLoginButtonClick}>
        <img src='https://static.solved.ac/res/logo-whitetext.svg' />
        <span>로그인하기</span>
      </button>
    </Container>
  );
};

export default LoginPanel;
