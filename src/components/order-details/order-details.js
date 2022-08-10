import styles from "./order-details.module.css";

import { useSelector } from "react-redux";

function OrderDetails() {
  const { orderDetails, orderDetailsRequest } = useSelector((state) => state.cart);

  return (
    <div className={styles.content}>
      <h2 className="text text_type_digits-large">
        {orderDetails.order && orderDetails.order.number}
      </h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className={`${orderDetailsRequest && styles.rotation}`}  src="./done.svg" alt="done" width={120} height={120}/>
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
