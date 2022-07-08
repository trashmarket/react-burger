import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {modalType} from "../../utils/types";

function OrderDetails() {
  return (
    <>
      <div className={styles.content}>
        <h2 className="text text_type_digits-large">034536</h2>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img src="./done.svg" alt="done" width={120} height={120} />
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  );
}

OrderDetails.protoTypes = modalType

export default OrderDetails;
