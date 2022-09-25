import { useEffect , useState} from "react";
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
  FeedPage,
  OrderFullCardPage,
  ProfileOrderPage
} from '../../pages'
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import AppHeader from "../app-header/app-header";
import { getUserAuth, selectPerson } from '../../services/actions/person';
import { baseUrl } from '../../utils/constants';
import { getItems } from "../../services/actions/cart";



function App() {
  const location = useLocation()
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const [ingredient, setIngredient] = useState(null);
  const [constructor, setConstructor] = useState(false);
  const history = useHistory()

  function setUseModalState(item, typeState) {
    item && "ingredient" === typeState
      ? setIngredient(item)
      : setIngredient(null);
    item && "constructor" === typeState
      ? setConstructor(item)
      : setConstructor(false);
  }

  function goback(path) {
    history.replace({
      pathname: path
    })
    setUseModalState(null)    
  }

  function onClose(e, typeCode, path) {
    if (e.key === "Escape") {
      goback(path)
    }

    if (e.target.classList.contains(typeCode)){
      goback(path)
    }

    if ('button' === typeCode) {
      goback(path)
    }

  }

  useEffect(()=>{
    dispatch(getItems());
    console.log(background)
  },[])
  
  return (
    <>
        <AppHeader/>
        <Switch location={background || location}>

          <Route path='/feed' exact>
            <FeedPage
              setUseModalState={setUseModalState}
              ingredient={ingredient}
              onClose={onClose}
            />
          </Route>
          <Route path='/feed/:id' exact>
            <OrderFullCardPage/>
          </Route>
          <Route path='/'exact>
            <Constructor
             setUseModalState={setUseModalState}
             ingredient={ingredient}
             onClose={onClose}
             constructor={constructor}
             />
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
          <ProtectedRoute path='/profile/orders' exact>
            <ProfileOrderPage/>
          </ProtectedRoute>
        </Switch>
    </>
  );
}

export default App;
