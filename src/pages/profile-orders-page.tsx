import { useEffect, useState, FC } from "react";
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
import { useSelector, useDispatch} from '../services/hooks';
import styles from './profile-orders-page.module.css';
import { TSetUseModalState, TItemObjectList, TCartIngredient } from '../services/types-components'; 

type TProfileOrderPage = {
  setUseModalState: TSetUseModalState<TItemObjectList>;
}

export const ProfileOrderPage: FC<TProfileOrderPage> = ({setUseModalState}) => {
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