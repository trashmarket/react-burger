import React, { useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-card.module.css";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
import { useLocation, useHistory } from 'react-router-dom';


const BurgerCard = React.memo((props) => {
  const { selectedItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const history = useHistory();

  const count = useMemo(() => {
    return [
      ...selectedItems.filter((item, index) => item.name === props.item.name),
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
        history.push({
          pathname: '/ingredients/' + props.item._id,
          state: { background: location }
        })
        props.setNewIngredintmodal(props.item, 'ingredient')
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