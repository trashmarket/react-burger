import React from "react";
import styles from "./main.module.css";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function Main(props) {
    const [ingredients, setIngredients] = React.useState([]);

    function setNewIngredints(item) {
      setIngredients(prevState => [...prevState, item])
    }
    
    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <section className={styles.section}>
                <BurgerIngredients data={props.items} setIngredients={setNewIngredints}/>
                <BurgerConstructor basket={props.basket}/>                
            </section>
        </main>
    )
}

export default Main;