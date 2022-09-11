import { useState, useEffect } from 'react';
import styles from './login-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link,  Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postPerson, selectPerson  } from '../../services/actions/person';
import { baseUrl } from '../../utils/constants';

 function LoginMain() {
  const [valuePass, setValuePass] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  const dispatch = useDispatch();
  const {success, isLoaded} = useSelector(selectPerson);
  const location  = useLocation();


  const handleClickRegister = (e) => {
    e.preventDefault();

    dispatch(postPerson(baseUrl + 'auth/login', {
      email: valueEmail,
      password: valuePass 
    }))
  }

  if (!isLoaded) {
    return null;
  }

  if (success) {
    return (
      <Redirect 
        to={{
          pathname: location?.state?.from ? location.state.from.pathname : '/',
          state: location?.state?.fromLogin ? location.state.fromLogin : null 
        }}
      />
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.loginFormWrapper}>
        <form className={styles.loginForm} onSubmit={handleClickRegister}>
          <legend className="text text_type_main-medium">Вход</legend>
          <Input
            type="email"
            value={valueEmail}
            placeholder='E-mail'
            onChange={e => setValueEmail(e.target.value)}
          />
          <Input
            type="password"
            icon="ShowIcon"
            value={valuePass}
            placeholder='Пароль'
            onChange={e => setValuePass(e.target.value)}/>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <nav>
          <ul>
            <li className={`text text_type_main-small ${styles.loginLi}`}>
              <span className={styles.formSpan}>Вы — новый пользователь?</span>
              <Link to='/register' className={styles.navLink}>Зарегистрироваться</Link>
            </li>
            <li className={`text text_type_main-small ${styles.loginLi}`}>
              <span className={styles.formSpan}>Забыли пароль?</span>
              <Link to='/forgot-password' className={styles.navLink}>Восстановить пароль</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

export default LoginMain;

