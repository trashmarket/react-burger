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
import { TypeBurgerCardProp } from '../../services/types-components'
import { selectCart } from '../../services/actions/cart'
const BurgerCard = React.memo<TypeBurgerCardProp>((props) => {
  const { selectedItems } = useSelector(selectCart);
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
          state: { 
            background: location,
            ingredientId: props.item._id
          }
        })
        props.setUseModalState(props.item, 'ingredient')
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
        <CurrencyIcon type="primary"/>
      </p>
      <p className="text text_type_main-default">{props.item.name}</p>
      {count != 0 && <Counter count={count} size="default" />}
    </div>
  );
});

export default BurgerCard;
