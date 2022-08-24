import AppHeader from "./components/app-header/app-header";
import Main from "./components/main/main";
import { Provider } from "react-redux";
import { store } from './services/store';
import {Constructor, LoginPage} from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Router path='/login'>
            <LoginPage/>
          </Router>
          <Route path='/'>
            <Constructor/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
