import React from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import ScrollBar from "../scroll-bar/scroll-bar";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'

function BurgerIngredients(props) {
  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList
        data={props.data}
        setNewIngredintmodal={props.setNewIngredintmodal}
      />
      {props.ingredient && (
        <Modal closeModal={props.setNewIngredintmodal}>
          <IngredientDetails
            ingredient={props.ingredient}
          />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.protoTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType).isRequired),
  setNewIngredintmodal: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired
}

export default BurgerIngredients;
