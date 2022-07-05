import React from 'react';

import AppHeader from '../../components/app-header/app-header';
import Main from '../../components/main/main';
import {data, basket} from '../../utils/data';

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(
      res => {
        setIsLoaded(true);
        setItems(res.data); 
      },

      error => {
        setIsLoaded(true);
        setError(error);
      }
      )
  }, [])
  
  return (
    <>
      <AppHeader/>
      <Main items={items} basket={basket}/>
    </>
  );
}

export default App;
