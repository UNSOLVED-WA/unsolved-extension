import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Test from './tt/Test';

const App: React.FC<{}> = () => {
  return (
    <div>
      <Test />
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
