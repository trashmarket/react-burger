import { useEffect, useState, useMemo, FC } from "react";
import { OrderFullCard } from "../components/order-full-card/order-full-card";
import { selectCart } from "../services/actions/cart";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../services/hooks";
import { createrOrderObject } from "../components/orders-list/orders-list";
import styles from "./order-full-card-page.module.css";
import { WS_CONNECTION_START_ALL, WS_CONNECTION_START_PRIVATE } from "../services/constants";
import { TWsOrders } from '../services/types/data'
import {
  selectOrders,
  startWsConnectionAction,
  closeWsAction,
} from "../services/actions/ws-action";

type TOrderFullCardPage = {
  action: typeof WS_CONNECTION_START_ALL | typeof WS_CONNECTION_START_PRIVATE;
  payload: string;
}

export const OrderFullCardPage: FC<TOrderFullCardPage> = ({ action, payload }) => {
  const { orders, getItemsSucces } = useSelector(selectOrders);
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const param = useParams<{id: string}>();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(startWsConnectionAction(action, payload));

    return () => {
      dispatch(closeWsAction());
    };
  }, []);

  useEffect(() => {
    if (orders.length) {
      setOrder(orders.find((item: TWsOrders) => item._id === param.id));
    }
  }, [getItemsSucces]);

  const objectCart = useMemo(() => {
    if (order) return createrOrderObject(order, items);
  }, [order]);

  if (objectCart) {
    return (
      <div className={styles.container}>
        <OrderFullCard ingredient={objectCart} />
      </div>
    );
  } else return null;
}
