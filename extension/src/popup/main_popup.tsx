import React from 'react';
import ReactDOM from 'react-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import { Popup } from './components';
import { theme, globalStyles } from './style';
import { GlobalStyles } from '@mui/joy';

const App = () => {
  return (
    <CssVarsProvider defaultMode='system' theme={theme} modeStorageKey='demo_identify-system-mode' disableNestedContext>
      <GlobalStyles styles={globalStyles} />
      <Popup />
    </CssVarsProvider>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
