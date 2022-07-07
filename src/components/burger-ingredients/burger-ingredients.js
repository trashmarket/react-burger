import React from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import ScrollBar from "../scroll-bar/scroll-bar";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {
  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList
        data={props.data}
        setNewIngredintmodal={props.setNewIngredintmodal}
      />
      {props.ingredient && (
        <Modal deadModal={props.setNewIngredintmodal}>
          <IngredientDetails
            ingredient={props.ingredient}
            deadModal={props.setNewIngredintmodal}
          />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
