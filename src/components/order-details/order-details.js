import styles from "./order-details.module.css";
import React, {useContext} from "react";
import {CardContext} from '../../services/app-contex'
function OrderDetails() {
  const {cart} = useContext(CardContext);
  
  return (
    <>
      <div className={styles.content}>
        <h2 className="text text_type_digits-large">{cart && cart.order.number}</h2>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img src="./done.svg" alt="done" width={120} height={120} />
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  );
}

export default OrderDetails;
