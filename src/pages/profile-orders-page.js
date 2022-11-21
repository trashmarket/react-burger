import { useEffect, useState } from "react";
import OrdersList from "../components/orders-list/orders-list";
import { selectCart } from "../services/actions/cart"
import {
  selectOrders,
  startWsConnectionAction,
  closeWsAction
  } from './../services/actions/ws-action';
import {
  WS_CONNECTION_START_PRIVATE,
} from '../services/constants'
import { useSelector, useDispatch} from 'react-redux';
import styles from './profile-orders-page.module.css';


export function ProfileOrderPage({setUseModalState}) {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const { orders } = useSelector(selectOrders);
  const [ordersReverse, setOrderReverse] = useState(null);


  useEffect(()=>{
    dispatch(startWsConnectionAction(WS_CONNECTION_START_PRIVATE, '?token='))
    return () => {
      dispatch(closeWsAction())
    }
  },[])

  useEffect(() => {
    setOrderReverse(orders.reverse())
  }, [orders])

  return (
    ordersReverse &&
    <div className={styles.ordersWrapper}>
      <OrdersList
        orders={ordersReverse}
        itemsCart={items}
        setUseModalState={setUseModalState}
      />
    </div>
  );
}