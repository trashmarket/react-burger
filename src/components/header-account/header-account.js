import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-account.module.css';

function HeaderAccount() {
    return(
        <div className={styles.container}>
            <ProfileIcon type="secondary" style={{marginRight: '8px'}}/>
            <a href="#" className='text text_type_main-default text_color_inactive'>Личный кабинет</a>
        </div>
    )
}

export default HeaderAccount