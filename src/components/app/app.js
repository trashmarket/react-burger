import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from '../../services/store';
import {
  Constructor,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPassworldPage,
  ProfilePage,
  IngredientsPage
} from '../../pages'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import AppHeader from "../app-header/app-header";
import { getUserAuth, selectPerson } from '../../services/actions/person';
import { baseUrl } from '../../utils/constants';
import { getItems } from "../../services/actions/cart";



function App() {
  const location = useLocation()
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  useEffect(()=>{
    dispatch(getUserAuth(baseUrl + 'auth/user'));
    console.log('hello')
  })

  useEffect(()=>{
    dispatch(getItems());
  },[])
  return (
    <>
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
          <Route path='/'>
            <Constructor/>
          </Route>
        </Switch>
    </>
  );
}

export default App;
