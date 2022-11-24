import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  FC
} from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "../../services/hooks";
import LiDragAndDrop from "../li-drag-and-drop/li-drag-and-drop.js";
import { 
  postOrder,
  dropBunAction,
  dropItemAction,
  getCurrentLocalStateAction,
  getIncrementCartAction
 } from '../../services/actions/cart'
import { useDrop } from "react-dnd";
import { baseUrl } from '../../utils/constants';
import { getUserAuth, selectPerson } from '../../services/actions/person';
import { useHistory, useLocation } from 'react-router-dom';
import { checkHistory } from '../../utils/utils'; 
import { selectCart } from '../../services/actions/cart';
import { TBurgerConstructor } from '../../services/types-components';
import { TItems, TItemSelect } from '../../services/types/data'

 const BurgerConstructor:FC<TBurgerConstructor> = ({ setUseModalState, bull, onClose }) => {
  const { basketIngredients, currentModal, selectedItems } = useSelector(
    selectCart
  );
  const [orderButton, setOrderButton] = useState<boolean | null>(null);
  const {success, passRequestFailed} = useSelector(selectPerson);
  const history = useHistory();
  const location = useLocation<{fromLogin:Array<TItemSelect>}>();
  const dispatch = useDispatch();

  const [collected, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item:TItems) {
      if (item.type === "bun") {
        dispatch(dropBunAction(item));
      } else {
        dispatch(dropItemAction(item));
      }
      dispatch(getIncrementCartAction());
    },
  });

  const ingredients = useMemo(
    () =>
      selectedItems.filter((item) => {
        if (item.type !== "bun") {
          return true;
        }
      })
      ,
    [selectedItems]
  );

  const bun = useMemo(
    () =>
      selectedItems.filter((item, index) => {
        if (item.type === "bun") {
          return true;
        }
      }),
    [selectedItems]
  );
  
  useEffect(() => {
    checkHistory(history);
  }, [])

  useEffect(() => {
    if (passRequestFailed && basketIngredients.ingredientsId.length && orderButton) {
      history.replace({
        pathname: "/login",
        state: { fromLogin: [...selectedItems] },
      });
    }

    if (success && basketIngredients.ingredientsId.length && orderButton && selectedItems.length) {
      history.push({
        pathname: "/ingredients/" + "order",
        state: {
          background: location,
        },
      });
      setUseModalState(true, 'constructor')
      dispatch(postOrder(`${baseUrl}orders`, {ingredients: basketIngredients.ingredientsId}));
    }

    if (location.state?.fromLogin) {
      dispatch(getCurrentLocalStateAction(location));
    }
    
  }, [
    success,
    passRequestFailed,
    basketIngredients,
    selectedItems,
    orderButton,
  ]);


  const postRequest = useCallback(() => {
    if (!success) {
      dispatch(getUserAuth(baseUrl + 'auth/user'));
    }
  
    setOrderButton(true)
  }, [basketIngredients, success]);

  return (
    <section className={`${styles.section} ${!selectedItems.length && styles.boxEmty}`} ref={dropTarget}>
    {selectedItems.length ?
      <div className={styles.wrapperConstructor}>
        {bun.map((item, index) => {
          return (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
              key={item.uuid}
            />
          );
        })}

        <ul className={styles.list}>
          { ingredients.map((item, index) => {
            return <LiDragAndDrop {...item} index={index} key={item.uuid} />;
          })}
        </ul>

        {bun.map((item, index) => {
          return (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${item.name} (вниз)`}
              price={item.price}
              thumbnail={item.image}
              key={item.uuid}
            />
          );
        })}
      </div>
      : <h3>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</h3>
      }
      {
      selectedItems.length != 0 &&
      <div className={styles.button}>
        <div className={styles.span}>
          <span className="text text_type_digits-medium">
            {basketIngredients.cost}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            postRequest();
          }}
          htmlType='button'
        >Оформить заказ</Button>
      </div>
      }
      {bull && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}


export default BurgerConstructor;
