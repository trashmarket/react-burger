import React from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import ScrollBar from "../scroll-bar/scroll-bar";
import Modal from "../modal/modal"; 

function BurgerIngredients(props) {
  
  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList data={props.data} setNewIngredintmodal={props.setNewIngredintmodal} />
      {props.ingredient && <Modal ingredient={props.ingredient} deadModal={props.setNewIngredintmodal}/>}
    </section>
  );
}

export default BurgerIngredients;
