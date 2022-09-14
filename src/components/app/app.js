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
  IngredientsPage,
  FeedPage
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
    dispatch(getItems());
  },[])
  
  return (
    <>
        <AppHeader/>
        <Switch location={background || location}>
          <Route path='/feed'exact>
            <FeedPage/>
          </Route>
          <Route path='/'exact>
            <Constructor/>
          </Route>
          <Route path='/ingredients/:id'exact>
            <IngredientsPage/>
          </Route>
          <Route path='/register'exact>
            <RegisterPage/>
          </Route>
          <Route path='/login'exact>
            <LoginPage/>
          </Route>
          <Route path='/reset-password'exact>
            <ResetPassworldPage/>
          </Route>
          <Route path='/forgot-password'exact>
            <ForgotPasswordPage/>
          </Route>
          <ProtectedRoute path='/profile'exact>
            <ProfilePage/>
          </ProtectedRoute>
        </Switch>
    </>
  );
}

export default App;
