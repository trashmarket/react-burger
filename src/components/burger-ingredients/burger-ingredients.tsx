import React, {FC} from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { TSetUseModalState, TOnClose } from '../../services/types-components';
import { TItems } from '../../services/types/data';

export type TBurgerIngredients = {
  readonly setUseModalState: TSetUseModalState<TItems | boolean>;
  readonly ingredient: TItems | null | boolean;
  readonly onClose: TOnClose;
}

const BurgerIngredients: FC<TBurgerIngredients> = ({setUseModalState, ingredient, onClose}) => {

  return (
    <section className={styles.wrapper}>
      <BurgerNavTab />
      <BurgerList
      setUseModalState={setUseModalState}
      />
      {ingredient && (
        <Modal onClose={onClose}>
          <IngredientDetails ingredient={ingredient}/>
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
