import React from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector } from "react-redux";


function BurgerIngredients() {
  const {currentModal} = useSelector(state => state.cart)
  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList
      />
      {currentModal === 'ingredient' && (
        <Modal>
          <IngredientDetails/>
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
