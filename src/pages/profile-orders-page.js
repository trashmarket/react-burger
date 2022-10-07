import { useEffect, useState } from "react";
import OrdersList from "../components/orders-list/orders-list";
import { selectCart } from "../services/actions/cart"
import {
  selectOrders,
  WS_CONNECTION_START_PRIVET,
  WS_CLOSE
  } from './../services/actions/ws-action';
import { useSelector, useDispatch} from 'react-redux';
import styles from './profile-orders-page.module.css';


export function ProfileOrderPage({setUseModalState}) {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const { orders } = useSelector(selectOrders);
  const [ordersReverse, setOrderReverse] = useState(null);


  useEffect(()=>{
    dispatch({
      type: WS_CONNECTION_START_PRIVET
    })
    return () => {
      dispatch({
        type: WS_CLOSE
      })
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