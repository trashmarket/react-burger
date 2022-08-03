import React, { useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_ITEM_CART } from "../../services/actions/cart";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';

const BurgerCard = React.memo((props) => {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state) => state.cart);
  const count = useMemo(() => {
    return [
      ...selectedItems.filter((item, index) => item._id === props.item._id),
    ].reduce((previousValue, item) => previousValue + 1, 0);
  }, [selectedItems]);
  
  const [collected, dragRef] = useDrag({
    type: 'ingredient',
    item: props.item
  })

  return (
    <div
      className={styles.card}
      onClick={() => {
        dispatch({
          type: GET_ITEM_CART,
          itemCart: props.item,
          currentModal: "ingredient",
        });
      }}
      ref={dragRef}
    >
      <img
        className={styles.img}
        src={props.item.image}
        alt={props.item.name}
      />
      <p className={styles.p}>
        {" "}
        <span className="text text_type_digits-default mr-1 mt-1 mb-1">
          {props.item.price}
        </span>{" "}
        <CurrencyIcon className="ml-1" />
      </p>
      <p className="text text_type_main-default">{props.item.name}</p>
      {count && <Counter count={count} size="default" />}
    </div>
  );
});

export default BurgerCard;

BurgerCard.propTypes = {
  item: PropTypes.shape(ingredientType)
}