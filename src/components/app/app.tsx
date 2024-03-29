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
import { TItems } from '../../services/types/data';
import { TItemObjectList, TOnClose } from '../../services/types-components'

function App() {
  const location = useLocation<{background: any}>()
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const [ingredientObjectList, setIngredientObjectList] = useState< TItemObjectList | null >(null);
  const [ingredientConstructor, setIngredientConstructor] = useState< TItems | null | boolean>(null);
  const [ConstructorBool, setConstructorBool] = useState<TItems | null | boolean >(false);
  const history = useHistory()

  function setUseModalState(item:any, typeState?: string) {
    item && "ingredient" === typeState
      ? setIngredientConstructor(item)
      : setIngredientConstructor(null);
    item && 'ingredientObjectList' === typeState 
      ? setIngredientObjectList(item)
      : setIngredientObjectList(null)
    item && "constructor" === typeState
      ? setConstructorBool(item)
      : setConstructorBool(false);
  }

  function goback(path: string) {
    history.replace({
      pathname: path
    })
    setUseModalState(null)    
  }

  const onClose: TOnClose = (e: any , typeCode: string | null, path: string) => {
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
            ingredient={ingredientObjectList}
            onClose={onClose}
          />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderFullCardPage action={WS_CONNECTION_START_ALL} payload='/all'/>
        </Route>
        <Route path="/" exact>
          <Constructor
            setUseModalState={setUseModalState}
            ingredient={ingredientConstructor}
            onClose={onClose}
            ConstructorBool={ConstructorBool}
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
            ingredient={ingredientObjectList}
            onClose={onClose}
          />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
