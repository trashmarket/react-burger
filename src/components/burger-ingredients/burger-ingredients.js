import React from "react";
import BurgerNavTab from '../burger-nav-tab/burger-nav-tab'
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css"
import ScrollBar from "../scroll-bar/scroll-bar";

function BurgerIngredients (props) {
    return (
        <section className={styles.wrapper}>
            <BurgerNavTab/>
            <BurgerList data={props.data} />
            <ScrollBar/>
        </section>
    )
}

export default BurgerIngredients;
