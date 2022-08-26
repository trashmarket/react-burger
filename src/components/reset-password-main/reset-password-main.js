import { useState } from 'react';
import styles from './reset-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ResetPassworldPage() {
  const [valueEmail, setValueEmail] = useState('');
  const [code, setCode] = useState('');

  return (
    <main className={styles.main}>
      <div className={styles.resetFormWrapper}>
        <form className={styles.resetForm}>
          <legend className="text text_type_main-medium">Восстановление пароля</legend>
          <Input
            type="email"
            value={valueEmail}
            placeholder='E-mail'
            onChange={e => setValueEmail(e.target.value)}
          />
          <Input
            type='text'
            value={code}
            placeholder='Введите код из письма'
            onChange={e => setCode(e.target.value)}
          />
          <Button type="primary" size="medium" onClick={null}>
            Сохранить
          </Button>
        </form>
        <nav>
          <ul>
            <li className={`text text_type_main-small ${styles.loginLi}`}>
              <span className={styles.formSpan}>Вспомнили пароль?</span>
              <Link to='/login' className={styles.navLink}>Войти</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default ResetPassworldPage