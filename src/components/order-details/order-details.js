import styles from "./order-details.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useHistory, useLocation } from 'react-router-dom';
import done from '../../images/donep.png'
function OrderDetails() {
  const { orderDetails, orderDetailsRequest } = useSelector((state) => state.cart);

  // const history = useHistory()
  // const location = useLocation()
  // useEffect(()=>{
  //   if(orderDetails?.order?.number) {
  //     history.push({
  //       pathname: 'order/detail',
  //       state: { background: location }
  //     })
  //   }
  // }, [orderDetails])

  return (
    <div className={styles.content}>
      <h2 className="text text_type_digits-large">
        {orderDetails.order && orderDetails.order.number}
      </h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className={`${orderDetailsRequest && styles.rotation}`}  src={done} alt="done" width={120} height={120}/>
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
