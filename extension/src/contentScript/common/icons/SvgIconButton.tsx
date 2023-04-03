import React from 'react';
import SvgIcon from './SvgIcon';

type Props = {
  onClick?: () => void;
} & React.ComponentProps<typeof SvgIcon>;

const SvgIconButton = ({ onClick, children, ...props }: Props) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      <SvgIcon {...props}>{children}</SvgIcon>
    </button>
  );
};

export default SvgIconButton;

const buttonStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '0',
  cursor: 'pointer',
};
