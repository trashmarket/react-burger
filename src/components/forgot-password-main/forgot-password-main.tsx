import { useState, useEffect, FormEvent, FormEventHandler } from 'react';
import styles from './forgot-password-main.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { postEmail, selectPassword } from '../../services/actions/password';
import { selectPerson, getUserAuth } from '../../services/actions/person';
import { baseUrl } from '../../utils/constants';


function ForgotPasswordMain() {
  const [valueEmail, setValueEmail] = useState('');
  const dispatch = useDispatch();

  const { isLoaded, success } = useSelector(selectPerson);
  const { passwordSuccess } = useSelector(selectPassword)
  const history = useHistory();

  useEffect(()=>{
    dispatch(getUserAuth(baseUrl + 'auth/user'));
    console.log('hello')
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(postEmail(baseUrl + 'password-reset', {
      email: valueEmail
    }))
  }

  useEffect(()=>{
    if (passwordSuccess) {
      history.replace({
        pathname: '/reset-password',
        state: {from: 'forgot-password'}
      });
      
    }
  }, [passwordSuccess])

  
  if (!isLoaded) {
    return null
  }
  
  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.forgotFormWrapper}>
        <form className={styles.forgotForm} onSubmit={handleSubmit}>
          <legend className="text text_type_main-medium">Восстановление пароля</legend>
          <Input
            type="email"
            value={valueEmail}
            placeholder='E-mail'
            onChange={e => setValueEmail(e.target.value)}
          />
          <Button type="primary" size="medium" htmlType="submit">
            Восстановить
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

export default ForgotPasswordMain;