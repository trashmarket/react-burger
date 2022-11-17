import React, {
  useMemo,
  useCallback,
  useEffect,
  useState
} from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import LiDragAndDrop from "../li-drag-and-drop/li-drag-and-drop.js";
import {
  GET_INCREMENT_CART
} from "../../services/constants";
import { 
  postOrder,
  dropBunAction,
  dropItemAction,
  getCurrentLocalStateAction
 } from '../../services/actions/cart'
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../../utils/constants'
import { getUserAuth, selectPerson } from '../../services/actions/person'
import { useHistory, useLocation } from 'react-router-dom';
import { checkHistory } from '../../utils/utils' 


function BurgerConstructor({ setUseModalState, bull, onClose }) {
  const { basketIngredients, currentModal, selectedItems } = useSelector(
    (state) => state.cart
  );
  const [orderButton, setOrderButton] = useState(null);
  const {success, passRequestFailed} = useSelector(selectPerson);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [collected, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch(dropBunAction(item));
      } else {
        dispatch(dropItemAction(item));
      }
      dispatch({
        type: GET_INCREMENT_CART,
      });
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
    // setUseModalState(null);
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
        >
          Оформить заказ
        </Button>
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

BurgerConstructor.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default BurgerConstructor;
