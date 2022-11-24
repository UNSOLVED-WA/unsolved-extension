import React, { useState, useEffect } from 'react';
import { CacheProvider, Global, css } from '@emotion/react';
import createCache from '@emotion/cache';
import weakMemoize from '@emotion/weak-memoize';
import { createPortal } from 'react-dom';

const memoizedCreateCacheWithContainer = weakMemoize((container: Node) => {
  const newCache = createCache({
    container,
    key: 'with-emotion',
  });
  return newCache;
});

export const IFrame = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [contentRef, setContentRef] = useState(null);
  const doc = contentRef?.contentWindow?.document;
  const mountNode = doc?.body;
  const insertionTarget = doc?.head;

  useEffect(() => {
    if (contentRef) {
      contentRef.contentWindow.document.body.style.margin = '0';
    }
  }, [contentRef]);

  return (
    <iframe title={title} ref={setContentRef} style={{ width: '100%', height: '100%', border: 'none' }}>
      {mountNode &&
        insertionTarget &&
        createPortal(
          <CacheProvider value={memoizedCreateCacheWithContainer(insertionTarget)}>
            <Global
              styles={css`
                * {
                  font-family: 'Roboto', sans-serif;
                  line-height: 16px;
                  box-sizing: border-box;
                }
              `}
            />
            {children}
          </CacheProvider>,
          mountNode
        )}
    </iframe>
  );
};
