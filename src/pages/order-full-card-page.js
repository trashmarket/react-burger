import { useEffect, useState, useMemo } from "react";
import { OrderFullCard } from "../components/order-full-card/order-full-card";
import { selectCart } from "../services/actions/cart";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createrOrderObject } from "../components/orders-list/orders-list";
import styles from "./order-full-card-page.module.css";
import {
  selectOrders,
  startWsConnectionAction,
  closeWsAction,
} from "../services/actions/ws-action";

export function OrderFullCardPage({ action, payload }) {
  const { orders, getItemsSucces } = useSelector(selectOrders);
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const param = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(startWsConnectionAction(action, payload));

    return () => {
      dispatch(closeWsAction());
    };
  }, []);

  useEffect(() => {
    if (orders.length) {
      setOrder(orders.find((item) => item._id === param.id));
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
