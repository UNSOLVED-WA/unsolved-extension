import React from 'react';
import { IconComponent } from './Icon';

const CorrectIcon: IconComponent = ({ color }: { color?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48' fill={color}>
      <path d='M31.3 21.35q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm-14.6 0q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.925-.775-.775-1.925-.775-1.1 0-1.9.775-.8.775-.8 1.925 0 1.1.8 1.9.8.8 1.9.8Zm7.3 13.6q3.3 0 6.075-1.775Q32.85 31.4 34.1 28.35h-2.6q-1.15 2-3.15 3.075-2 1.075-4.3 1.075-2.35 0-4.375-1.05t-3.125-3.1H13.9q1.3 3.05 4.05 4.825Q20.7 34.95 24 34.95ZM24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44Zm0-20Zm0 17q7.1 0 12.05-4.95Q41 31.1 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.1 0-12.05 4.95Q7 16.9 7 24q0 7.1 4.95 12.05Q16.9 41 24 41Z' />
    </svg>
  );
};

export default CorrectIcon;
