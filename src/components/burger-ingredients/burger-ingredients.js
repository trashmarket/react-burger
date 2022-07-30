import React from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


function BurgerIngredients(props) {
  const {currentModal} = useSelector(state => state.cart)
  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList
        setNewIngredintmodal={props.setNewIngredintmodal}
      />
      {currentModal === 'ingredient' && (
        <Modal closeModal={props.setNewIngredintmodal}>
          <IngredientDetails/>
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.protoTypes = {
  setNewIngredintmodal: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired
}

export default BurgerIngredients;
