import React, {
  useContext,
  useReducer,
  useState,
  useMemo,
  useCallback,
} from "react";
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
import { baseUrl } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_DECREMENT_CATR,
  GET_DROP_BUN,
  GET_DROP_ITEM,
  GET_INCREMENT_CART,
  postOrder,
} from "../../services/actions/cart";
import { useDrop } from "react-dnd";

function BurgerConstructor(props) {
  const { items, basketIngredients, currentModal, selectedItems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const [collected, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch({
          type: GET_DROP_BUN,
          itemType: item.type,
          item,
        });
      } else {
        dispatch({
          type: GET_DROP_ITEM,
          itemType: item.type,
          item,
        });
      }
      dispatch({
        type: GET_INCREMENT_CART,
      });
    },
  });

  const ingredients = useMemo(
    () =>
      selectedItems.filter((item) => {
        if (item.type !== "bun") {
          return true;
        }
      }),
    [selectedItems]
  );

  const bun = useMemo(
    () =>
      selectedItems.filter((item, index) => {
        if (item.type === "bun") {
          return true;
        }
      }),
    [selectedItems]
  );

  const handleClose = (e) => {
    dispatch({
      type: GET_DECREMENT_CATR,
    });
  };

  const postRequest = useCallback(() => {
    dispatch(postOrder(`${baseUrl}orders`, basketIngredients.ingredientsId));
  }, [basketIngredients]);

  return (
    <section className={styles.section} ref={dropTarget}>
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
                  handleClose={() =>
                    dispatch({
                      type: GET_DECREMENT_CATR,
                      index: index,
                      cost: item.price,
                      id: item._id,
                    })
                  }
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
          <span className="text text_type_digits-medium">
            {basketIngredients.cost}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            postRequest();
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {currentModal === "orderDetails" && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
