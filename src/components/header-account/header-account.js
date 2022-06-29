import { ProfileIcon, LogoutIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-account.module.css';
import React from 'react';

function HeaderAccount() {
    const [indexSelect, setIndexSelect] = React.useState(null);

    const [loginEnter, setloginEnter] = React.useState(1);
   
    function handelClickLink(e) {
        if (e.target.classList.contains('text_color_inactive')) {
            setIndexSelect(parseInt(e.target.id, 10));
        } else setIndexSelect(null)
    }

    return(
        <div className={styles.container}>
            <ProfileIcon type={loginEnter === indexSelect ? 'primary' : 'secondary'}/>
            <a href="#" className={`text text_type_main-default ${loginEnter === indexSelect ? '' : 'text_color_inactive'}`} id='1' onClick={handelClickLink}>
            Личный кабинет
            </a>
        </div>
    )
}

export default HeaderAccount