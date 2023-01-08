import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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

export { fadeIn, scaling, border_pulse };
