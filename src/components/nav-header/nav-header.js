import styles from "./nav-header.module.css";   
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { NavLink, useLocation } from 'react-router-dom';


function NavHeader() {

    const { pathname } = useLocation();

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li} key={1}>
                    <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
                    <NavLink 
                      to='/'
                      className={`text text_type_main-default ml-4 text_color_inactive`} 
                      exact
                      activeClassName={styles.navLinkActive}
                    >
                        Конструктор
                    </NavLink>
                </li>
                <li className={styles.li} key={2}>
                    <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'}/>
                    <NavLink
                      to='/feed' 
                      className={`text text_type_main-default ml-4 text_color_inactive`}
                      exact
                      activeClassName={styles.navLinkActive}
                    >
                        Лента заказов
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavHeader