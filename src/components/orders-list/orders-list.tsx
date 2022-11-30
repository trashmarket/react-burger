import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, memo, FC } from 'react';
import styles from './orders-list.module.css';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { TWsOrders, TItems } from '../../services/types/data';
import { TSetUseModalState, TItemObjectList, TCartIngredient } from '../../services/types-components'; 

type TOrdersList = {
  orders: Array<TWsOrders>;
  itemsCart: Array<TItems>;
  setUseModalState: TSetUseModalState<TItemObjectList>;
}
const countImgIngredients = (sortCarts: Array<TItems>, ingredients: Array<any>) => {

 return sortCarts.map( imagesItem => ingredients.reduce((acc: TCartIngredient , ingredientId: string)=>{
    if (imagesItem._id === ingredientId) {
      if (imagesItem.type === 'bun') {
        return {
          ...imagesItem,
          fullPrice: imagesItem.price * 2,
          count: 2,
        }  
      }
      return {
        ...imagesItem,
        count:  acc.count ? acc.count + 1 : 1,
        fullPrice: acc.fullPrice ? acc.fullPrice + acc.price : imagesItem.price
      }  
    } else return acc
  },{}))
}

export const createrOrderObject = (orderItem:TWsOrders, itemsCart: Array<TItems>) => {
  const date = new Date(orderItem.createdAt);
  const nowDate = new Date();
  const getDate = () => Math.round((new Date().getTime() - Date.parse(orderItem.createdAt)) / 86400000 );
  const todayOrNotetoday = getDate() === 0 ? 'Сегодня' : getDate() === 1 ? 'Вчера' : getDate() + ' дня назад'; 
  const time = date.toLocaleTimeString().split(':').slice(0, -1).join(':');
  const imagesItems = itemsCart.filter(({_id}) =>  orderItem.ingredients.some(id => _id === id));
  const cartIngredient = countImgIngredients(imagesItems, orderItem.ingredients);
  const costFull = cartIngredient.reduce((acc: number, currentItem:TCartIngredient)=> (acc + currentItem.fullPrice) ,0);
  return {
    item: orderItem,
    time: time,
    costFull: costFull,
    todayOrNotetoday: todayOrNotetoday,
    cartIngredient: cartIngredient
  }
}

const OrdersList: FC<TOrdersList> =  ({ orders, itemsCart, setUseModalState }) => {
  const location = useLocation();
  const history = useHistory();
  const { path } = useRouteMatch();

  const onClick = (itemObject: TItemObjectList, item: TWsOrders) => {
    history.push({
      pathname: path + '/' + item._id,
      state: { 
        background: location,
        ingredientId: item._id,
        itemObject
      }
    })
    setUseModalState(itemObject, "ingredientObjectList")
  }

  return (
    <ul>
      {orders.map(item => {

       const  { 
          time,
          costFull,
          todayOrNotetoday,
          cartIngredient
        } = createrOrderObject(item, itemsCart)

        return (
        <li key={item._id} className={styles.conteiner} onClick={ () => onClick({
          item,
          cartIngredient,
          time,
          costFull,
          todayOrNotetoday
          }, item)}>
          <div className={styles.numberWrapper}>
            <p className="text text_type_digits-default">{'#' + item.number}</p>
            <p className="text text_type_main-default text_color_inactive">{`${todayOrNotetoday} ${time} i-GMT+3`}</p>
          </div>
          <h3 className="text text_type_main-medium">{item.name}</h3>
          <div className={styles.ingredientsWrapper}>
            <ul className={styles.ingredientsList}>{cartIngredient.map(({image, name, _id}: TCartIngredient, index: number, arr:Array<TCartIngredient>)=> {
              if (index > 5) return '';
             return (
              <li key={_id} className={`${styles.ingredientsItem} ${ index === 5 && styles.ingredientsItemm}`} style={{
                zIndex: arr.length - index + 1
              }}>
                {((5 - ( 1 + index)) < 0 ) && <span className={`${styles.residue} text text_type_digits-default`}>  + {arr.length - 5}</span> }
                <img src={image} alt={name} />
              </li>)
              }
              )}
            </ul>
            <div className={styles.costWrapper}>
              <span className="text text_type_digits-default">
                {costFull}
              </span>
              <CurrencyIcon type="primary"/>
            </div>  
          </div>
        </li>
        )
      })}
    </ul>
  )
}

export default memo(OrdersList) 