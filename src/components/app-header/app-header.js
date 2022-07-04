import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavHeader from '../nav-header/nav-header';
import HeaderAccount from '../header-account/header-account';
function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.page}>
                <NavHeader/>
                <Logo/>
                <HeaderAccount/>
            </div>
        </header>
    )
}

export default AppHeader;