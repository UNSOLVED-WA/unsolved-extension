import styled from '@emotion/styled';
import { LogoSize } from '../types/types';
import { css, keyframes } from '@emotion/react';

const scaling = keyframes`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.05);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`;

const border_pulse = keyframes`
  0% {
    border: 1px solid red;
    border-radius: 50%;
    opacity: 1;
  }
  100% {
    border: 1px solid red;
    border-radius: 50%;
    width: 68px;
    height: 68px;
    opacity: 0;
  }
`;

const defaultStyle = css`
  border-radius: 50% !important;
  cursor: pointer;

  &&:hover {
    transform-origin: 50% 50%;
    transform: translateY(-50%) scale(1.5);
  }

  &:hover::before {
    content: '';
    display: block;
    position: fixed;
    width: 50px;
    height: 50px;
    top: 50%;

    transform: translateY(-50%);
    animation: ${border_pulse} 1s ease-in-out infinite 0.3s;
  }
`;

const clickedStyle = css`
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(60px);

  right: 12px;

  width: 350px;
  height: 500px;
  border-radius: 15px !important;
  animation: ${scaling} 0.3s ease-in-out 0.25s forwards;
  cursor: default;

  &:hover {
    transform: translateY(-50%) scale(1);
  }

  &:hover::before {
    display: none;
  }
`;

export const UnsolvedFloatButton = styled.div<{ isClicked: boolean }>`
  padding: 0px;
  position: fixed;
  background: red;
  top: 50%;
  right: -6px;
  z-index: 9999999;

  border: 0px;
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  transition: all 0.3s ease-in-out;
  box-shadow: rgb(0 0 0 / 30%) 0px 12px 60px 5px;

  & > button {
    z-index: 10000000;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0px;
  }

  ${({ isClicked }) => (isClicked ? clickedStyle : defaultStyle)};
`;
