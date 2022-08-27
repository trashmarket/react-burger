import { useState } from "react";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './profile-main.module.css';

function ProfileMain() {
  const name = '';
  const pass = '';
  const login = '';

  return (
    <main className={styles.main}>
      <div className={styles.navWrapper}>   
        <nav className="text text_type_main-medium mb-20">
          <ul className={styles.ul}>
            <li className="pb-3 pt-3">
              <NavLink to='/profile' exact activeClassName={styles.navLinkActive} className={styles.navLink}>
                Профиль
              </NavLink>
            </li>
            <li className="pb-3 pt-3">
              <NavLink to='/profile/orders' exact activeClassName={styles.navLinkActive} className={styles.navLink}>
                История заказов
              </NavLink>
            </li>
            <li className="pb-3 pt-3">
              <NavLink to='/profile/orders/:id' exact activeClassName={styles.navLinkActive} className={styles.navLink}>
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default ${styles.navP}`}>
        В этом разделе вы можете
        изменить&nbsp;свои&nbsp;персональные данные
        </p>
      </div>
      <div className={styles.inputWrapper}>
        <Input placeholder="Имя" value={name} onChange={()=>null} icon='EditIcon'/>
        <Input placeholder="Логин" value={pass} onChange={()=>null} icon='EditIcon'/>
        <Input placeholder="Пароль" value={login} onChange={()=>null} icon='EditIcon'/>
      </div>
    </main>
  )
}

export default ProfileMain;