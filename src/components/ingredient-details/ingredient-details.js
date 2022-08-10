import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types'
function IngredientDetails({ingredient}) {
  const {itemCart} = useSelector(state => state.cart)
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <div className={styles.content}>
        <img
          src={`${ingredient.image}`}
          alt={ingredient.name}
          width={520}
          height={240}
        />
        <p className="text text_type_main-medium">{ingredient.name}</p>
        <ul className={styles.ul}>
          <li className="text text_type_main-default">
            <span>Калории,ккал</span>
            {ingredient.calories}
          </li>
          <li className="text text_type_main-default">
            <span>Белки, г</span>
            {ingredient.proteins}
          </li>
          <li className="text text_type_main-default">
            <span>Жиры, г</span>
            {ingredient.fat}
          </li>
          <li className="text text_type_main-default">
            <span>Углеводы, г</span>
            {ingredient.carbohydrates}
          </li>
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired
}

export default IngredientDetails;