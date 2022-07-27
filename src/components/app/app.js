import React from "react";
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/utils'
import AppHeader from "../../components/app-header/app-header";
import Main from "../../components/main/main";
import { ItemsContext, CardContext } from "../../services/app-contex.js";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

function App() {
  const url = `${baseUrl}ingredients`;
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cart, setCart] = React.useState(null)
  React.useEffect(() => {
    fetch(url)
      .then(checkResponse)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        {
          setError(error);
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    
      <ItemsContext.Provider value={{ items, setItems }}>
        <CardContext.Provider value={{cart, setCart}}>
          <AppHeader />
          {error && <div>{error.message}</div>}
          {!isLoaded ? <div>...Загрузка</div> : <Main />}
        </CardContext.Provider>
      </ItemsContext.Provider>
    
  );
}

export default App;
