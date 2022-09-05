import { Provider } from "react-redux";
import { store } from './services/store';
import {Constructor, LoginPage, RegisterPage, ForgotPasswordPage, ResetPassworldPage, ProfilePage} from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/profile'>
            <ProfilePage/>
          </Route>
          <Route path='/reset-password'>
            <ResetPassworldPage/>
          </Route>
          <Route path='/forgot-password'>
            <ForgotPasswordPage/>
          </Route>
          <Route path='/register'>
            <RegisterPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/'>
            <Constructor/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
