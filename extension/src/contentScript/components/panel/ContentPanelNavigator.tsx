import React, { useRef } from 'react';
import NavigatorContainer from '../../style/ContentPanelNavigator.styled';
import Divider from '../../style/Divider.styled';

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

  function handleMouseEnter() {
    if (navigatorRef.current && navigatorTextsRef.current) {
      navigatorRef.current.style.width = '160px';
      navigatorTextsRef.current.style.opacity = '1';
      navigatorTextsRef.current.style.marginLeft = '60px';
    }
  }

  function handleMouseLeave() {
    if (navigatorRef.current && navigatorTextsRef.current) {
      navigatorRef.current.style.width = '60px';
      navigatorTextsRef.current.style.opacity = '0';
      navigatorTextsRef.current.style.width = '0px';
    }
  }

  function handleClick(index: number) {
    handleMouseLeave();
    handleSelectedIndex(index);
  }

  return (
    <NavigatorContainer ref={navigatorRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='naviitem logos'>
        <span className='unsolved-wa-logo-large'>wa</span>
        <Divider />
        {contents.map((item, index) => (
          <span key={'icon-' + item.text} className='logo material-symbols-outlined' onClick={() => handleClick(index)}>
            {item.icon}
          </span>
        ))}
      </div>
      <div className='naviitem texts' ref={navigatorTextsRef}>
        <span className='unsolved text'>unsolved</span>
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

export default React.memo(ContentPanelNavigator);
