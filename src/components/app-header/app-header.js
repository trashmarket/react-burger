import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavHeader from '../nav-header/nav-header';
import HeaderAccount from '../header-account/header-account';
function AppHeader() {
    return (
        <header className={styles.header}>
            <NavHeader/>
            <Logo/>
            <HeaderAccount/>
        </header>
    )
}

export default AppHeader;