import React from 'react';

import AppHeader from '../../components/app-header/app-header';
import Main from '../../components/main/main';
import {data, basket} from '../../utils/data';

function App() {

  return (
    <>
      <AppHeader/>
      <Main items={data} basket={basket}/>
    </>
  );
}

export default App;
