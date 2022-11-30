import { useEffect , useState, SyntheticEvent, KeyboardEvent} from "react";
import { useDispatch } from "../../services/hooks";
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
} from '../../pages'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import AppHeader from "../app-header/app-header";
import { getItems } from "../../services/actions/cart";
import { WS_CONNECTION_START_ALL, WS_CONNECTION_START_PRIVATE } from '../../services/constants'
import { TItems } from '../../services/types/data'

function App() {
  const location = useLocation<{background: any}>()
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const [ingredient, setIngredient] = useState<TItems | null | boolean>(null);
  const [constructor, setConstructor] = useState<TItems | null | boolean>(false);
  const history = useHistory()

  function setUseModalState(item:TItems | null | boolean, typeState?: string) {
    item && "ingredient" === typeState
      ? setIngredient(item)
      : setIngredient(null);
    item && "constructor" === typeState
      ? setConstructor(item)
      : setConstructor(false);
  }

  function goback(path: string) {
    history.replace({
      pathname: path
    })
    setUseModalState(null)    
  }

  function onClose(e: any , typeCode: string, path: string) {
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
  },[])
  
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/feed" exact>
          <FeedPage
            setUseModalState={setUseModalState}
            ingredient={ingredient}
            onClose={onClose}
          />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderFullCardPage action={WS_CONNECTION_START_ALL} payload='/all'/>
        </Route>
        <Route path="/" exact>
          <Constructor
            setUseModalState={setUseModalState}
            ingredient={ingredient}
            onClose={onClose}
            constructor={constructor}
          />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientsPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassworldPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderFullCardPage action={WS_CONNECTION_START_PRIVATE} payload='?token='/>
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage
            setUseModalState={setUseModalState}
            ingredient={ingredient}
            onClose={onClose}
          />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
