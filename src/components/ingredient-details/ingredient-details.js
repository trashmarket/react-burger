import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styles from './ingredient-details.module.css';
function IngredientDetails() {
  const {itemCart} = useSelector(state => state.cart)
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <div className={styles.content}>
        <img
          src={`${itemCart.image}`}
          alt={itemCart.name}
          width={520}
          height={240}
        />
        <p className="text text_type_main-medium">{itemCart.name}</p>
        <ul className={styles.ul}>
          <li className="text text_type_main-default">
            <span>Калории,ккал</span>
            {itemCart.calories}
          </li>
          <li className="text text_type_main-default">
            <span>Белки, г</span>
            {itemCart.proteins}
          </li>
          <li className="text text_type_main-default">
            <span>Жиры, г</span>
            {itemCart.fat}
          </li>
          <li className="text text_type_main-default">
            <span>Углеводы, г</span>
            {itemCart.carbohydrates}
          </li>
        </ul>
      </div>
    </div>
  );
}


export default IngredientDetails;