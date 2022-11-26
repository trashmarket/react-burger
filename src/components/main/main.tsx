import React, {FC} from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TBurgerIngredients } from '../burger-ingredients/burger-ingredients'

type TMain = {
  constructor: boolean;
} & TBurgerIngredients

const Main: FC<TMain> = ({setUseModalState, ingredient, onClose, constructor}) => {

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
