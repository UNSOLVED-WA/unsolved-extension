import React, { useState, useEffect } from 'react';
import { CacheProvider, Global, css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import weakMemoize from '@emotion/weak-memoize';
import { createWebIcon, icons } from '../../style/icons';
import { createPortal } from 'react-dom';
import { theme } from '../../style/theme';

const memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  const newCache = createCache({
    container,
    key: 'with-emotion',
  });
  return newCache;
});

const IFrame = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [contentRef, setContentRef] = useState(null);
  const doc = contentRef?.contentWindow?.document;
  const mountNode = doc?.body;
  const insertionTarget = doc?.head;

  useEffect(() => {
    if (contentRef) {
      contentRef.contentWindow.document.body.style.margin = '0';
    }
  }, [contentRef]);

  useEffect(() => {
    if (insertionTarget) {
      insertionTarget.appendChild(createWebIcon(icons.face));
      insertionTarget.appendChild(createWebIcon(icons.star));
      insertionTarget.appendChild(createWebIcon(icons.recommend));
      insertionTarget.appendChild(createWebIcon(icons.refresh));
      insertionTarget.appendChild(createWebIcon(icons.edit_square));
      insertionTarget.appendChild(createWebIcon(icons.group_add));
    }
  }, [insertionTarget]);

  return (
    <iframe title={title} ref={setContentRef} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '15px' }}>
      {mountNode &&
        insertionTarget &&
        createPortal(
          <CacheProvider value={memoizedCreateCacheWithContainer(insertionTarget)}>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyles} />
              {children}
            </ThemeProvider>
          </CacheProvider>,
          mountNode
        )}
    </iframe>
  );
};

export default IFrame;

const globalStyles = css`
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
  .unsolved-wa-logo-large {
    border-radius: 5px !important;
    background: #ffffff;
    position: relative;
    color: #ff0000;
    height: 24px;
    font-size: 20px;
    font-weight: 600;
    padding: 0px 7.5px;
  }
  .organizations-change-button {
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    background-color: #ffffff;
    color: #fa6a6a;
  }
  .organizations-change-button:hover {
    background-color: #fa6a6a;
    color: white;
  }
  .organizations {
    padding: 0;
    margin: 0;
  }
  .organizations .organization {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    font-size: 14.5px;
    font-weight: 600;
    color: #555555;
    cursor: pointer;
  }
  .organizations .organization:hover {
    background-color: #e5e5e5;
  }
  .responsible-height {
    max-height: 57px;
    min-height: 57px;
    transition: all 0.25s linear;
  }
  .responsible-height.activate {
    min-height: 0px;
  }
  .responsible-height.activate.shortest {
    max-height: 21px;
  }
  .responsible-height.activate.short {
    max-height: 42px;
  }
  .responsible-height.activate.long {
    max-height: 150px;
  }
`;
