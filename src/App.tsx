import React, { useState } from 'react';
import { Title } from './components/Title';
import { TabContainer } from './components/TabContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Title />
      <TabContainer />
    </div>
  );
}

export default App;
