import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_ITEM_CART } from "../../services/actions/cart";

const BurgerCard = React.memo((props) => {
  const [count, setCount] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.index) {
      setCount(props.count);
    } else {
      setCount(null);
    }
  }, []);

  return (
    <div
      className={styles.card}
      onClick={() => {
        setCount(count + 1);
        dispatch({
          type: GET_ITEM_CART,
          itemCart: props.item,
          currentModal: 'ingredient'
        });
      }}
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
