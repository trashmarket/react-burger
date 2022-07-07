import React from "react";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

import styles from './ingredient-details.module.css';
function IngredientDetails(props) {
  return (
    <>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <div className={styles.content}>
        <img
          src={`${props.ingredient.image}`}
          alt={props.ingredient.name}
          width={520}
          height={240}
        />
        <p className="text text_type_main-medium">{props.ingredient.name}</p>
        <ul className={styles.ul}>
          <li className="text text_type_main-default">
            <span>Калории,ккал</span>
            {props.ingredient.calories}
          </li>
          <li className="text text_type_main-default">
            <span>Белки, г</span>
            {props.ingredient.proteins}
          </li>
          <li className="text text_type_main-default">
            <span>Жиры, г</span>
            {props.ingredient.fat}
          </li>
          <li className="text text_type_main-default">
            <span>Углеводы, г</span>
            {props.ingredient.carbohydrates}
          </li>
        </ul>
      </div>
      <div className={styles.close} onClick={() => props.deadModal(null)}>
        <CloseIcon type="primary" />
      </div>
    </>
  );
}

IngredientDetails.protoTypes = {
  ingredient: PropTypes.object.isRequired,
  deadModal: PropTypes.func.isRequired
}

export default IngredientDetails;