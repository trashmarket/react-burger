import React, { useContext } from "react";
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/utils'
import AppHeader from "../../components/app-header/app-header";
import Main from "../../components/main/main";
import { rootReduser } from '../../services/reducers/index'
import { ItemsContext, CardContext } from "../../services/app-contex.js";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from "react-redux";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReduser, enhancer)

function App() {
  const url = `${baseUrl}ingredients`;
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [cart, setCart] = React.useState(null)


  return (
    
      <Provider store={store}>
        <CardContext.Provider value={{cart, setCart}}>
          <AppHeader />
          <Main />
        </CardContext.Provider>
      </Provider>
    
  );
}

export default App;
