import React, { useRef } from 'react';

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FaceIcon from '@mui/icons-material/Face';
import CodeIcon from '@mui/icons-material/Code';

import NavigatorContainer from '../../style/ContentPanelNavigator.styled';
import Divider from '../../style/Divider.styled';
import UnsolvedLogo from '../UnsolvedLogo';

interface NavigatorProps {
  contents: {
    text: string;
    icon: string;
  }[];
  handleSelectedIndex: (index: number) => void;
}

const ContentPanelNavigator = ({ contents, handleSelectedIndex }: NavigatorProps) => {
  const navigatorRef = useRef<HTMLDivElement>(null);
  const navigatorTextsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (navigatorRef.current && navigatorTextsRef.current) {
      navigatorRef.current.style.width = '160px';
      navigatorTextsRef.current.style.opacity = '1';
      navigatorTextsRef.current.style.marginLeft = '60px';
    }
  };

  const handleMouseLeave = () => {
    if (navigatorRef.current && navigatorTextsRef.current) {
      navigatorRef.current.style.width = '60px';
      navigatorTextsRef.current.style.opacity = '0';
      navigatorTextsRef.current.style.width = '0px';
    }
  };

  const handleClick = (index: number) => {
    handleMouseLeave();
    handleSelectedIndex(index);
  };

  const icons = {
    profile: <FaceIcon />,
    ranking: <WorkspacePremiumIcon />,
    problem: <CodeIcon />,
  };

  return (
    <NavigatorContainer ref={navigatorRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='logos'>
        <UnsolvedLogo size='large' />
        <Divider />
        {contents.map((item, index) => (
          <span className='logo' key={'icon-' + item.text} onClick={() => handleClick(index)}>
            {icons[item.icon]}
          </span>
        ))}
      </div>
      <div className='texts' ref={navigatorTextsRef}>
        <span className='unsolved'>unsolved</span>
        <Divider />
        {contents.map((item, index) => (
          <span className='text' key={'text-' + item.text} onClick={() => handleClick(index)}>
            {item.text}
          </span>
        ))}
      </div>
    </NavigatorContainer>
  );
};

export default ContentPanelNavigator;
