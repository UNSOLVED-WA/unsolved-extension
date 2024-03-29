import React, { useRef } from 'react';
import NavigatorContainer from '../../style/ContentPanelNavigator.styled';
import Divider from '../../style/Divider.styled';
import { FaceIcon, StarIcon, RecommendIcon, ScoringIcon } from '../../common/icons';
interface NavigatorProps {
  contents: {
    text: string;
    icon: string;
  }[];
  handleSelectedIndex: (index: number) => void;
}

const CPNavigator = ({ contents, handleSelectedIndex }: NavigatorProps) => {
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
        <FaceIcon onClick={() => handleClick(0)} />
        <StarIcon onClick={() => handleClick(1)} />
        <RecommendIcon onClick={() => handleClick(2)} />
        <ScoringIcon onClick={() => handleClick(3)} />
      </div>
      <div className='naviitem texts' ref={navigatorTextsRef}>
        <span className='text'>unsolved</span>
        <Divider />
        {contents.map((item, index) => (
          <span className='text' key={'n-t-' + item.text} onClick={() => handleClick(index)}>
            {item.text}
          </span>
        ))}
      </div>
    </NavigatorContainer>
  );
};

export default React.memo(CPNavigator);
