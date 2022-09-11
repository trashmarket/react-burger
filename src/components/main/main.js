import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {  useHistory } from 'react-router-dom';

function Main() {
  const [ingredient, setIngredient] = React.useState(null);
  const [constructor, setConstructor] = React.useState(false);
  const history = useHistory()

  function setUseModalState(item, typeState) {
    item && "ingredient" === typeState
      ? setIngredient(item)
      : setIngredient(null);
    item && "constructor" === typeState
      ? setConstructor(item)
      : setConstructor(false);
  }

  function goback() {
    history.replace({
      pathname: '/'
    })
    setUseModalState(null)    
  }

  function onClose(e, typeCode) {
    if (e.key === "Escape") {
      goback()
    }

    if (e.target.classList.contains(typeCode)){
      goback()
    }

    if ('button' === typeCode) {
      goback()
    }

  }

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <section className={styles.section}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            setUseModalState={setUseModalState}
            ingredient={ingredient}
            onClose={onClose}
          />
          <BurgerConstructor
            setUseModalState={setUseModalState}
            bull={constructor}
            onClose={onClose}
          />
        </DndProvider>
      </section>
    </main>
  );
}

export default Main;
