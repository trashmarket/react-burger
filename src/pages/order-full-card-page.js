import { useEffect, useState, useMemo } from 'react';
import { OrderFullCard } from '../components/order-full-card/order-full-card';
import {
  selectOrders,
  WS_CONNECTION_START_ALL_ORDER,
  WS_CONNECTION_CLOSED
  } from '../services/actions/ws-action';
import { selectCart } from '../services/actions/cart'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createrOrderObject } from '../components/orders-list/orders-list'
import styles from './order-full-card-page.module.css'

export function OrderFullCardPage() {
  const { orders, getItemsSucces }  = useSelector(selectOrders);
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const param = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_ALL_ORDER
    })

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      })
    }
  }, [])

  useEffect(() => {
    if (orders.length) {
      setOrder(orders.find(item => item._id === param.id))
    }
  }, [getItemsSucces])

  const objectCart = useMemo(()=> {
    if (order) return createrOrderObject(order, items)
  } , [order])

  return objectCart && (
  <div className={styles.container}>
    <OrderFullCard ingredient={objectCart}/>
  </div>)
} 