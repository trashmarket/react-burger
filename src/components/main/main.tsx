import React, {FC} from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TBurgerIngredients } from '../burger-ingredients/burger-ingredients'
import { TItems } from '../../services/types/data';
import { TSetUseModalState, TOnClose } from '../../services/types-components';

export type TMain = {
  ConstructorBool: boolean | TItems | null;
} & {
  readonly setUseModalState: TSetUseModalState<TItems | boolean>;
  readonly ingredient: TItems | null | boolean ;
  onClose: TOnClose;
}

const Main: FC<TMain> = ({setUseModalState, ingredient, onClose, ConstructorBool}) => {

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
            bool={ConstructorBool}
            onClose={onClose}
          />
        </DndProvider>
      </section>
    </main>
  );
}

export default Main;
