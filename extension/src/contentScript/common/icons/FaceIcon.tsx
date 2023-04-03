import React from 'react';
import SvgIconButton from './SvgIconButton';

type Props = React.SVGProps<SVGSVGElement> & {
  onClick?: () => void;
};

const FaceIcon = ({ onClick, ...props }: Props) => {
  return (
    <SvgIconButton onClick={onClick} fill='navicon' width='24' height='24' viewBox='0 96 960 960' {...props}>
      <path d='M357.901 668.103q-21.158 0-36.068-15.061-14.91-15.06-14.91-36.474 0-21.414 15.06-36.068 15.061-14.654 36.475-14.654t36.068 14.871q14.653 14.871 14.653 36.408 0 21.157-14.87 36.067-14.871 14.911-36.408 14.911Zm244.051 0q-21.157 0-36.067-15.061-14.911-15.06-14.911-36.474 0-21.414 15.061-36.068 15.06-14.654 36.474-14.654 21.414 0 36.068 14.871 14.654 14.871 14.654 36.408 0 21.157-14.871 36.067-14.871 14.911-36.408 14.911ZM479.95 902.154q136.556 0 231.38-94.886 94.824-94.885 94.824-231.602 0-24.487-3.41-47.628-3.41-23.141-10.36-44.141-21.076 5-42.558 7.423-21.482 2.424-45.513 2.424-92.62 0-175.454-39.411-82.833-39.41-140.962-110.538-32.307 78.461-93.192 137.192-60.885 58.731-140.859 88.958V576q0 136.577 94.774 231.366 94.774 94.788 231.33 94.788Zm.184 33.846q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120 650.806 120 576.134q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194 216 479.866 216q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840 501.194 840 575.866q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806 936 480.134 936Z' />
    </SvgIconButton>
  );
};

export default FaceIcon;
