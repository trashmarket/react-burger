import React, { useContext, useReducer, useState, useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ItemsContext } from "../../services/app-contex";

const initialState = { cost: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { cost: state.cost + action.cost };
    case "decrement":
      return { cost: state.cost - action.cost };
    default:
      throw new Error("что то не так");
  }
}
function BurgerConstructor(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items } = useContext(ItemsContext);

  const ingredients = useMemo(
    () =>
      items.filter((item) => {
        if (item.type !== "bun") {
          dispatch({
            type: "increment",
            cost: item.price,
          });
          return true;
        }
      }),
    [items]
  );

  const bun = useMemo(
    () =>
      items.filter((item, index) => {
        if (index === 0) {
          dispatch({
            type: "increment",
            cost: item.price * 2,
          });
          return true;
        }
      }),
    [items]
  );
  console.log(state);

  return (
    <section className={styles.section}>
      <div className={styles.wrapperConstructor}>
        {bun.map((item, index) => {
          return (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
              key={index}
            />
          );
        })}

        <ul className={styles.list}>
          {ingredients.map((item, index) => {
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
          })}
        </ul>

        {bun.map((item, index) => {
          return (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${item.name} (вниз)`}
              price={item.price}
              thumbnail={item.image}
              key={index}
            />
          );
        })}
      </div>
      <div className={styles.button}>
        <div className={styles.span}>
          <span className="text text_type_digits-medium">{state.cost}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            props.setConstructor(true, "constructor");
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {props.bull && (
        <Modal closeModal={props.setConstructor}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.protoTypes = {
  setConstructor: PropTypes.func.isRequired,
  bull: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
