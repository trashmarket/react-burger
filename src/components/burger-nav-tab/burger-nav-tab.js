import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import styles from "./burger-nav-tab.module.css";
import { GET_CURRENT_TAB } from "../../services/actions/cart";
import { useDispatch, useSelector } from "react-redux";

function BurgerNavTab() {
  const { currentTab } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={styles.nav}>
      <Tab
        value="one"
        active={currentTab === "one"}
        onClick={() =>
          dispatch({
            type: GET_CURRENT_TAB,
            currentTab: "one",
          })
        }
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={currentTab === "two"}
        onClick={() =>
          dispatch({
            type: GET_CURRENT_TAB,
            currentTab: "two",
          })
        }
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={currentTab === "three"}
        onClick={() =>
          dispatch({
            type: GET_CURRENT_TAB,
            currentTab: "three",
          })
        }
      >
        Начинки
      </Tab>
    </div>
  );
}

export default BurgerNavTab;
