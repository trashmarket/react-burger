import React from "react";
import styles from "./main.module.css";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function Main(props) {
    const [ingredients, setIngredients] = React.useState([]);
    console.log(ingredients);

    function setNewIngredints(item) {
      
      setIngredients(prevState => [...prevState, item])
    }
    
    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            <section>
                <BurgerIngredients data={props.items} setIngredients={setNewIngredints}/>                
            </section>
        </main>
    )
}

export default Main;