import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
function BurgerConstructor(props) {
  return (
    <section className={styles.section}>
      <div className={styles.wrapperConstructor}>
        {
          props.basket.map( (item, index) => {
            if (index === 0) {
              return (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                  key={index}
                />
              )
            }
          })
        }

        <ul className={styles.list}>
          {props.basket.filter( item => item.type !== 'bun').map((item, index) => {
            if (item.type !== "bun") {
              return (
                <li className={styles.li} key={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            }
          })}
        </ul>

        {
          props.basket.map( (item, index) => {
            if (index === 0) {
              return (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (вниз)`}
                  price={item.price}
                  thumbnail={item.image}
                  key={index}
                />
              )
            }
          })
        }
      </div>
      <div className={styles.button}>
        <div className={styles.span}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() =>props.setConstructor(true, 'constructor')}>
          Оформить заказ
        </Button>
      </div>
    {props.bull && <Modal closeModal={props.setConstructor}><OrderDetails/></Modal>}
    </section>
  );
}

BurgerConstructor.protoTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape(ingredientType).isRequired),
  setConstructor: PropTypes.func.isRequired,
  bull: PropTypes.bool.isRequired
};

export default BurgerConstructor;
