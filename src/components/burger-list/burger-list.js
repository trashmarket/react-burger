import React, { useContext, useEffect } from "react";
import BurgerCard from "../burger-card/burger-card";
import styles from "./burger-list.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { sort } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/cart";

function BurgerList({ setNewIngredintmodal }) {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsFailed, errorStatus} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <ul className={styles.list}>
    {itemsRequest && <div>...ЗАГРУЗКА</div>}
    {itemsFailed && <div>{errorStatus}</div>}
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "bun"))
            .map((item, index) => (
              <BurgerCard
                index={index === 0 ? true : false}
                item={item}
                count={index === 0 ? 1 : null}
                key={item._id}
                setIngredients={setNewIngredintmodal}
              />
            ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "sauce"))
            .map((item, index) => (
              <BurgerCard
                index={index === 1 ? true : false}
                count={index === 1 ? 1 : null}
                item={item}
                key={item._id}
                setIngredients={setNewIngredintmodal}
              />
            ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "main"))
            .map((item, index) => (
              <BurgerCard
                item={item}
                key={item._id}
                index={
                  (index === 2 ? true : false) ||
                  (index === 3 ? true : false) ||
                  (index === 4 ? true : false)
                }
                count={
                  (index === 2 ? 1 : null) ||
                  (index === 3 ? 1 : null) ||
                  (index === 4 ? 2 : null)
                }
                setIngredients={setNewIngredintmodal}
              />
            ))}
        </div>
      </li>

      
    </ul>
  );
}

BurgerList.protoTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType).isRequired),

  setIngredients: PropTypes.func.isRequired,
};

export default BurgerList;
