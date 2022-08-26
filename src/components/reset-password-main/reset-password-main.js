import { useState } from 'react';
import styles from './reset-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postEmail } from '../../services/actions/password';
import { forgotPassword, passwordFogot } from '../../utils/constants';
import { postRequest } from "../../utils/request"
import { checkResponse } from "../../utils/utils";

function ResetPassworldPage() {
  const [newPass, setNewPass] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch()
  
  const handleClick = (e) => {
    e.preventDefault()
    // postRequest('https://norma.nomoreparties.space/api/auth/register',{
    //   email: "test-dataцsds34fd@yandex.ru", 
    //   password: "aisjdhoiqajidjaiodwipdjiodaj", 
    //   name: "aSLDKhjoidwhjaiodj" 
    // })
    // .then(checkResponse)
    // .then(res => console.log(res))
    // .catch(error=>console.log(error));

    dispatch(postEmail(passwordFogot, {
      password: newPass,
      token: code
    }))
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