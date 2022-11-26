import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItemObjectList } from '../../services/types-components';
import styles from './order-full-card.module.css';
import React, {FC} from 'react';

type TOrderFullCard = {
  ingredient: TItemObjectList
}

const OrderFullCard: FC<TOrderFullCard> = ({ingredient}) => {
  return (
    <div className={styles.continer}>
      <p className={`text text_type_digits-default ${styles.number}`}>#{ingredient.item.number}</p>
      <h3 className="text text_type_main-medium">{ingredient.item.name}</h3>
      <p className={`${styles.color} text text_type_main-small`} >Выполнен</p>
      <p className="text text_type_main-medium">Состав:</p>
      <ul className={styles.listWrapper}>
        {ingredient.cartIngredient.map(({image, name, _id, count, price}) => (
        <li key={_id} className={`${styles.itemWraper} text text_type_main-default`}>
          <div className={styles.imgWrapper}>
            <img src={image} alt={name} />
          </div>
          <p>
            {name}
          </p>
          <p className={`className="text text_type_digits-default" ${styles.spanWrapper}`}>
          <span className={styles.countSpan}>
            {count}
            x
            {price}
          </span>
            <CurrencyIcon type="primary"/>
          </p>
        </li>))}
      </ul>
      <p className={`${styles.footer} text text_type_main-default `}>
        
      <span className='text text_type_main-default text_color_inactive'>
      {`${ingredient.todayOrNotetoday}, ${ingredient.time} i-GMT+3`}
      </span>
        
        <span className={`${styles.fullCost} text text_type_main-default`}>
          {ingredient.costFull}
          <CurrencyIcon type="primary"/>
        </span>
      </p>
    </div>
  )
  
}

export {OrderFullCard}