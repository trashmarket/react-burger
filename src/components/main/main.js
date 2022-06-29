import React from "react";
import styles from "./main.module.css";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";

function Main(props) {
    const sortData = props.items.sort((a, b) => {
        if (a.type > b.type) {
            return 1; }
          if (a.type < b.type) {
            return -1; }
          return 0;
    });
    console.log(sortData);
    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <section>
                <BurgerNavTab/>
            </section>
        </main>
    )
}

export default Main;