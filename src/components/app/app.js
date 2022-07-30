import React, { useContext } from "react";
import AppHeader from "../../components/app-header/app-header";
import Main from "../../components/main/main";
import { rootReduser } from "../../services/reducers/index";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReduser, enhancer);

function App() {

  return (
    <Provider store={store}>
      <AppHeader />
      <Main />
    </Provider>
  );
}

export default App;
