import { useState, useEffect, FC, FormEventHandler, SyntheticEvent } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './profile-main.module.css';
import { patchUserAuth, postLogOut } from '../../services/actions/person';
import {baseUrl} from '../../utils/constants';
import { getCookie, checkHistory } from '../../utils/utils';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ProfileOrderPage } from '../../pages/profile-orders-page'
import Modal from '../modal/modal';
import { OrderFullCard } from '../order-full-card/order-full-card';
import { selectPerson } from "../../services/actions/person";
import { TSetUseModalState, TItemObjectList, TOnClose } from '../../services/types-components'; 


type TProfileMain = {
  setUseModalState: TSetUseModalState<TItemObjectList>;
  onClose: TOnClose;
  ingredient: null | TItemObjectList;
}

const ProfileMain: FC<TProfileMain> = (props) => {
  const [valueName, setValueName] = useState('...загрузка');
  const [valuePass, setValuePass] = useState('');
  const [valueEmail, setValueEmail] = useState('...загрузка');
  const history = useHistory();

  const dispatch = useDispatch();
  const personStore = useSelector(selectPerson);

  useEffect(()=>{
    checkHistory(history)
  }, [])

  useEffect(() => {
    if (personStore.success) {
      setValueEmail(personStore.user.email);
      setValueName(personStore.user.name);
    }
  }, [personStore])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setValueEmail('...сохранение');
    setValueName('...сохранение');
    dispatch(patchUserAuth(baseUrl + 'auth/user', {
      email: valueEmail,
      password: valuePass,
      name: valueName
    }))
  }
  
  const resetClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setValueEmail(personStore.user.email);
    setValueName(personStore.user.name);
  }

  const exitProfile = () => {
    dispatch(postLogOut(baseUrl + 'auth/logout', { token: getCookie('refreshToken')}))
  }

  return (
    <main className={styles.main}>
      <div className={styles.navWrapper}>
        <nav className="text text_type_main-medium mb-20">
          <ul className={styles.ul}>
            <li className="pb-3 pt-3">
              <NavLink
                to="/profile"
                exact
                activeClassName={styles.navLinkActive}
                className={styles.navLink}
              >
                Профиль
              </NavLink>
            </li>
            <li className="pb-3 pt-3">
              <NavLink
                to="/profile/orders"
                exact
                activeClassName={styles.navLinkActive}
                className={styles.navLink}
              >
                История заказов
              </NavLink>
            </li>
            <li className="pb-3 pt-3">
              <a className={styles.navLink} onClick={() => exitProfile()}>
                Выход
              </a>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default ${styles.navP}`}>
          В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные данные
        </p>
      </div>
      <Switch>
        <Route path="/profile" exact>
          <form className={styles.inputWrapper} onSubmit={onSubmit}>
            <Input
              placeholder="Имя"
              value={valueName}
              onChange={(e) => setValueName(e.target.value)}
              icon="EditIcon"
            />
            <Input
              placeholder="Логин"
              value={valueEmail}
              onChange={(e) => setValueEmail(e.target.value)}
              icon="EditIcon"
            />
            <Input
              placeholder="Пароль"
              value={valuePass}
              onChange={(e) => setValuePass(e.target.value)}
              icon="EditIcon"
            />
            <div>
              <Button type="primary" size="medium" onClick={resetClick} htmlType='button'>
                отмена
              </Button>
              <Button type="primary" size="medium" htmlType='button'>
                сохранить
              </Button>
            </div>
          </form>
        </Route>
        <Route path="/profile/orders" >
          <ProfileOrderPage {...props}/>
        </Route>
      </Switch>
      {props.ingredient && (
        <Modal onClose={props.onClose}>
          <OrderFullCard ingredient={props.ingredient}/>
        </Modal>
      )}
    </main>
  );
}

export default ProfileMain;