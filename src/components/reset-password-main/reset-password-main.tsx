import { useState, useEffect, FormEventHandler } from 'react';
import styles from './reset-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {  NavLink, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { postEmail } from '../../services/actions/password';
import {  baseUrl } from '../../utils/constants';
import { selectPerson, getUserAuth } from '../../services/actions/person';


function ResetPassworldPage() {
  const [newPass, setNewPass] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { success, isLoaded } = useSelector(selectPerson);

  const location = useLocation<{from:{}}>();

  useEffect(()=>{
    dispatch(getUserAuth(baseUrl + 'auth/user'));
    console.log('hello')
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    dispatch(postEmail(baseUrl + 'password-reset/reset', {
      password: newPass,
      token: code
    }))
  }

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
        <form className={styles.resetForm} onSubmit={handleSubmit}>
          <legend className="text text_type_main-medium">Восстановление пароля</legend>
          <Input
            type="text"
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
          <Button type="primary" size="medium" htmlType="submit">
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