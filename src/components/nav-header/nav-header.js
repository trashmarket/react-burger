import styles from "./nav-header.module.css";   
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";

function NavHeader() {
    const [typeBurger, setTypeBurger] = React.useState(1);
    const [typeListIcon, setTypeListIcon] = React.useState(2);

    const [selectIndex, setSelectIndex] = React.useState(1);
   
    function handelClickLink(e) {
        const id = parseInt(e.target.id, 10);
        setSelectIndex(id);
     }
    

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li} key={1}>
                    <BurgerIcon type={typeBurger === selectIndex ? 'primary' : 'secondary'}/>
                    <a className={typeBurger === selectIndex ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive'}  id="1" onClick={handelClickLink} href="#">
                        Конструктор
                    </a>
                </li>
                <li className={styles.li} key={2}>
                    <ListIcon type={typeListIcon === selectIndex ? 'primary' : 'secondary'}/>
                    <a className={typeListIcon === selectIndex ? 'text text_type_main-default' : 'text text_type_main-default text_color_inactive'}  id="2" onClick={handelClickLink} href="#">
                        Лента заказов
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default NavHeader