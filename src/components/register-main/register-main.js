import { useState, useEffect } from 'react';

import styles from './register-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postPerson } from '../../services/actions/person';
import { baseUrl } from '../../utils/constants';

const selectPassword = state => state.person;

function RegisterMain() {
  const [valueName, setValueName] = useState('');
  const [valuePass, setValuePass] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  const dispatch = useDispatch();
  const {success, isLoaded} = useSelector(selectPassword);

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    dispatch(postPerson(baseUrl + 'auth/register', {
      email: valueEmail,
      password: valuePass,
      name: valueName 
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

  return (
    <main className={styles.main}>
      <div className={styles.registerFormWrapper}>
      <form className={styles.registerForm} onSubmit={handleSubmitRegister}>
          <legend className="text text_type_main-medium">Регистрация</legend>
          <Input
            type="text"
            value={valueName}
            placeholder='Имя'
            onChange={e => setValueName(e.target.value)}
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