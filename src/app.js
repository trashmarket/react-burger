import { Provider } from "react-redux";
import { store } from './services/store';
import {Constructor, LoginPage, RegisterPage, ForgotPasswordPage, ResetPassworldPage, ProfilePage} from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/register'>
            <RegisterPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <ProtectedRoute path='/profile'>
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedRoute path='/reset-password'>
            <ResetPassworldPage/>
          </ProtectedRoute>
          <ProtectedRoute path='/forgot-password'>
            <ForgotPasswordPage/>
          </ProtectedRoute>
          <ProtectedRoute path='/'>
            <Constructor/>
          </ProtectedRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
