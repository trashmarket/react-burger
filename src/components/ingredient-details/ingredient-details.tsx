import React, { FC } from "react";
import styles from './ingredient-details.module.css';
import { TItems } from '../../services/types/data';

type TIngredientDetails = {
  ingredient: TItems | null | boolean ;
}

const IngredientDetails: FC<TIngredientDetails> = ({ingredient}) => {
  if (typeof ingredient !== 'boolean' &&  ingredient !== null ) 
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
  else return null
}

export default IngredientDetails;