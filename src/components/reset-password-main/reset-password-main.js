import { useState, useEffect } from 'react';
import styles from './reset-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {  NavLink, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmail } from '../../services/actions/password';
import {  baseUrl } from '../../utils/constants';
import { getUserAuth, selectPerson } from '../../services/actions/person';


function ResetPassworldPage() {
  const [newPass, setNewPass] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { success, isLoaded } = useSelector(selectPerson);

  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault()

    dispatch(postEmail(baseUrl + 'password-reset/reset', {
      password: newPass,
      token: code
    }))
  }

  useEffect(()=>{
    console.groupCollapsed(location)
    dispatch(getUserAuth(baseUrl + 'auth/user'))
  }, [])

  if (!isLoaded) {
    return null
  }

  if (success) {

    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  if (location?.state?.from !== 'forgot-password') {
    return (
      <Redirect
        to={{
          pathname: "/forgot-password",
        }}
      />
    );
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.resetFormWrapper}>
        <form className={styles.resetForm}>
          <legend className="text text_type_main-medium">Восстановление пароля</legend>
          <Input
            type="email"
            value={newPass}
            placeholder='Введите новый пароль'
            onChange={e => setNewPass(e.target.value)}
          />
          <Input
            type='text'
            value={code}
            placeholder='Введите код из письма'
            onChange={e => setCode(e.target.value)}
          />
          <Button type="primary" size="medium" onClick={handleClick}>
            Сохранить
          </Button>
        </form>
        <nav>
          <ul>
            <li className={`text text_type_main-small ${styles.loginLi}`}>
              <span className={styles.formSpan}>Вспомнили пароль?</span>
              <NavLink to='/login' exact className={styles.navLink} activeClassName={styles.navLinkActive}>Войти</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default ResetPassworldPage