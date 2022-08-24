import { useState } from 'react';

import styles from './register-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

function RegisterMain() {
  const [textValue, setTextValue] = useState('');
  const [valuePass, setValuePass] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  return (
    <main className={styles.main}>
      <div className={styles.registerFormWrapper}>
      <form className={styles.registerForm}>
          <legend className="text text_type_main-medium">Регистрация</legend>
          <Input
            type="text"
            value={textValue}
            placeholder='Имя'
            onChange={e => setTextValue(e.target.value)}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <nav>
          <ul>
            <li className={`text text_type_main-small ${styles.registerLi}`}>
              <span className={styles.formSpan}>Уже зарегистрированы?</span>
              <Link to='/login' className={styles.navLink}>Войти</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default RegisterMain