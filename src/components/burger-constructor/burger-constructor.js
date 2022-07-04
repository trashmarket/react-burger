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

function BurgerConstructor(props) {
  return (
    <section className={styles.section}>
      <div className={styles.wrapperConstructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.basket[0].name} (верх)`}
          price={props.basket[0].price}
          thumbnail={props.basket[0].image}
        />

        <ul className={styles.list}>
          {props.basket.map((item, index) => {
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

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.basket[0].name} (низ)`}
          price={props.basket[0].price}
          thumbnail={props.basket[0].image}
        />
      </div>
      <div className={styles.button}>
        <div className={styles.span}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.protoTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape(ingredientType).isRequired),
};

export default BurgerConstructor;
