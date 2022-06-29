import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

function BurgerNavTab () {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex', width: '47%', marginTop: '20px' }}>
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