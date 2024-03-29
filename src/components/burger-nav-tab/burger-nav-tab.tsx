import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import styles from "./burger-nav-tab.module.css";
import { clickTab } from "../../services/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../services/actions/cart";


function BurgerNavTab() {
  const { currentTab } = useSelector(selectCart);
  const dispatch = useDispatch();
  return (
    <div className={styles.nav}>
      <Tab
        value="one"
        active={currentTab === "one"}
        onClick={() => dispatch(clickTab("bun"))}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={currentTab === "two"}
        onClick={() => dispatch(clickTab("sauce"))}
      >
        Соусы
      </Tab>
      <Tab
        value="three"
        active={currentTab === "three"}
        onClick={() => dispatch(clickTab("main"))}
      >
        Начинки
      </Tab>
    </div>
  );
}

export default BurgerNavTab;
