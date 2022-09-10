import { ProfileIcon, LogoutIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-account.module.css';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';


function HeaderAccount() {

    const { pathname } = useLocation();

    return (
      <div className={styles.container}>
        <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
        <NavLink
          to="/profile"
          className={`text text_type_main-default ml-4 text_color_inactive`}
          exact
          activeClassName={styles.navLinkActive}
        >
          Личный кабинет
        </NavLink>
      </div>
    );
}

export default HeaderAccount