import styles from "./nav-header.module.css";   
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";

function NavHeader() {
    const [typeBurger, setTypeBurger] = React.useState('secondary');
    const [typeListIcon, setTypeListIcon] = React.useState('secondary');
    const firstLink = React.useRef(null);
    const secondLink = React.useRef(null);

    const optonsBurger = {
        
    }

    function handelClickLink(set, type, e, link, setAnother) {
        e.preventDefault();
        type === 'secondary' ? type = 'primary' : type = 'secondary';  
        setAnother('secondary');
        set(type);
        e.currentTarget.classList.toggle('text_color_inactive');
        link.current.classList.add('text_color_inactive');
    }
    

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <BurgerIcon type={typeBurger}/>
                    <a className="text text_type_main-default text_color_inactive" ref={firstLink} onClick={(e) => {handelClickLink(setTypeBurger, typeBurger, e, secondLink, setTypeListIcon)}} href="#">Конструктор</a>
                </li>
                <li className={styles.li}>
                    <ListIcon type={typeListIcon}/>
                    <a className="text text_type_main-default text_color_inactive" ref={secondLink} onClick={(e) => {handelClickLink(setTypeListIcon, typeListIcon, e, firstLink, setTypeBurger)}} href="#">Лента заказов</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavHeader