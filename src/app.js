import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from './services/store';
import {
  Constructor,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPassworldPage,
  ProfilePage,
  IngredientsPage
} from './pages'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import AppHeader from "./components/app-header/app-header";


function App() {
  const location = useLocation()

  const background = location.state && location.state.background;
  useEffect(()=>{
    console.log(location);
  }, [])
  return (
    <Provider store={store}>
        <AppHeader/>
        <Switch location={background || location}>
          <Route path='/ingredients/:id'>
            <IngredientsPage/>
          </Route>
          <Route path='/register'>
            <RegisterPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/reset-password'>
            <ResetPassworldPage/>
          </Route>
          <Route path='/forgot-password'>
            <ForgotPasswordPage/>
          </Route>
          <ProtectedRoute path='/profile'>
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedRoute path='/'>
            <Constructor/>
          </ProtectedRoute>
        </Switch>
    </Provider>
  );
}

export default App;
