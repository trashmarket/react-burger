import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            setNewIngredintmodal={setUseState}
            ingredient={ingredient}
          />
          <BurgerConstructor setNewIngredintmodal={setUseState} bull={constructor}/>
        </DndProvider>
      </section>
    </main>
  );
}

export default Main;
