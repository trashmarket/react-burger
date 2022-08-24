import { useState } from 'react';
import styles from './forgot-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

function ForgotPasswordMain() {
  const [valueEmail, setValueEmail] = useState('');

  return (
    <main className={styles.main}>
      <div className={styles.forgotFormWrapper}>
        <form className={styles.forgotForm}>
          <legend className="text text_type_main-medium">Восстановление пароля</legend>
          <Input
            type="email"
            value={valueEmail}
            placeholder='E-mail'
            onChange={e => setValueEmail(e.target.value)}
          />
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <nav>
          <ul>
            <li className={`text text_type_main-small ${styles.loginLi}`}>
              <span className={styles.formSpan}>Вспомнили пароль?</span>
              <Link to='/register' className={styles.navLink}>Войти</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default ForgotPasswordMain;