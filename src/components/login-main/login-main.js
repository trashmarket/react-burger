import { useState } from 'react';
import styles from './login-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

 function LoginMain() {
  const [valuePass, setValuePass] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  return (
    <main className={styles.main}>
      <div className={styles.loginFormWrapper}>
        <form className={styles.loginForm}>
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
