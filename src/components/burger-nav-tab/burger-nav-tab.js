import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-nav-tab.module.css';
import { GET_CURRENT_TAB } from '../../services/actions/cart'

function BurgerNavTab () {
    const [current, setCurrent] = React.useState('one')
    return (
      <div className={styles.nav}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
}

export default BurgerNavTab;