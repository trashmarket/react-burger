import React, {
  useMemo,
  useCallback,
  useEffect
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
import { baseUrl } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import LiDragAndDrop from "../li-drag-and-drop/li-drag-and-drop.js";
import {
  GET_CURENT_LOCAL_STATE,
  GET_DROP_BUN,
  GET_DROP_ITEM,
  GET_INCREMENT_CART,
  postOrder,
} from "../../services/actions/cart";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { authUser } from '../../utils/constants'
import { getUserAuth, selectPerson } from '../../services/actions/person'
import { useHistory, useLocation } from 'react-router-dom';


function BurgerConstructor({ setNewIngredintmodal, bull }) {
  const { basketIngredients, currentModal, selectedItems } = useSelector(
    (state) => state.cart
  );
  const {success, passRequestFailed} = useSelector(selectPerson);
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const [collected, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch({
          type: GET_DROP_BUN,
          itemType: item.type,
          item:{...item, uuid:uuidv4()}
        });
      } else {
        dispatch({
          type: GET_DROP_ITEM,
          itemType: item.type,
          item: {...item, uuid:uuidv4()}
        });
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
    // location.state = [selectedItems? ...se]
    if (location.state?.fromLogin) {
      dispatch({
        type: GET_CURENT_LOCAL_STATE,
        locationState: location.state.fromLogin
      })
    }
    console.log(location)
    if (success) {
      dispatch(postOrder(`${baseUrl}orders`, {ingredients: basketIngredients.ingredientsId}));
    }
    if (passRequestFailed) {
      history.replace({
        pathname: '/login',
        state: {fromLogin: [...selectedItems]}
      })
    }
  }, [success, passRequestFailed, basketIngredients, selectedItems])


  const postRequest = useCallback(() => {
    dispatch(getUserAuth(authUser));
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
      selectedItems.length &&
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
            setNewIngredintmodal(true, 'constructor')
          }}
        >
          Оформить заказ
        </Button>
      </div>
      }

      {bull && (
        <Modal setNewIngredintmodal={setNewIngredintmodal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  setNewIngredintmodal: PropTypes.func.isRequired,
}

export default BurgerConstructor;
