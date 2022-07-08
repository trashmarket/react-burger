import React from "react";
import styles from "./main.module.css";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types';

function Main(props) {
  const [ingredient, setIngredient] = React.useState(null);
  const [constructor, setConstructor] = React.useState(null);

  function setUseState(item, typeState) {
    item && "ingredient" === typeState
      ? setIngredient(item)
      : setIngredient(null);
    item && "constructor" === typeState
      ? setConstructor(item)
      : setConstructor(null);
  }

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <section className={styles.section}>
        <BurgerIngredients
          data={props.items}
          setNewIngredintmodal={setUseState}
          ingredient={ingredient}
        />
        <BurgerConstructor
          basket={props.items}
          setConstructor={setUseState}
          bull={constructor}
        />
      </section>
    </main>
  );
}

Main.protoTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(ingredientType.isRequired).isRequired)
}

export default Main;
