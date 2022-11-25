import React, {FC} from "react";
import BurgerNavTab from "../burger-nav-tab/burger-nav-tab";
import BurgerList from "../burger-list/burger-list";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import { TSetUseModalState, TOnClose } from '../../services/types-components';
import { TItems } from '../../services/types/data';

type TBurgerIngredients = {
  readonly setUseModalState: TSetUseModalState<TItems>;
  readonly ingredient: TItems | null;
  readonly onClose: TOnClose;
}

const BurgerIngredients: FC<TBurgerIngredients> = ({setUseModalState, ingredient, onClose}) => {

  React.useEffect(()=>{
    console.log(ingredient);
  },[ingredient])

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
