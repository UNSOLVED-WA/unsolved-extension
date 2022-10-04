import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/joy';
import { ContentBox } from '../../common';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 44px;
  gap: 10px;

  .panel-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const ContentPanelBody = ({ selectedIndex }) => {
  const [svgHTML, setSvgHTML] = useState('');
  const svgRef = useRef(null);

  // 프로필뷰로 분리 예정
  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'fetchBadge' }, (response) => {
      setSvgHTML(response.data);
      if (svgRef.current) {
        svgRef.current.lastElementChild.setAttribute('width', '270');
        svgRef.current.lastElementChild.setAttribute('height', '135');
        svgRef.current.lastElementChild.setAttribute('viewBox', '0 0 350 170');
      }
    });
  }, [selectedIndex]);

  return (
    <Container>
      {
        {
          0: (
            <div className="panel-contents">
              <ContentBox>
                <div>hi</div>
              </ContentBox>
              <ContentBox>
                <div>hi2</div>
              </ContentBox>
              <ContentBox>
                <div>hi3</div>
              </ContentBox>
              <ContentBox>
                <div>hi3</div>
              </ContentBox>
              {svgHTML == '' ? (
                <CircularProgress color="danger" size="sm" />
              ) : (
                <div ref={svgRef} dangerouslySetInnerHTML={{ __html: svgHTML }} />
              )}
            </div>
          ),
          1: (
            <div className="panel-contents">
              <ContentBox>
                <div>hi</div>
              </ContentBox>
            </div>
          ),
          2: (
            <div className="panel-contents">
              <ContentBox>
                <div>hi</div>
              </ContentBox>
            </div>
          ),
        }[selectedIndex]
      }
    </Container>
  );
};

export default ContentPanelBody;
