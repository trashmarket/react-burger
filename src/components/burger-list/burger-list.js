import React, { useCallback, useEffect, useRef } from "react";
import BurgerCard from "../burger-card/burger-card";
import styles from "./burger-list.module.css";
import { sort } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { GET_CURRENT_TAB } from "../../services/constants";

function BurgerList({ setUseModalState }) {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsFailed, errorStatus, currentTabClick } =
    useSelector((state) => state.cart);
  const ulRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    
    if (currentTabClick === "bun") {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (currentTabClick === "sauce") {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (currentTabClick === "main") {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }

    ulRef.current.addEventListener("scroll", (e) => {
      const elementScroll = e.currentTarget.scrollTop;

      if (
        elementScroll >= bunRef.current.offsetTop &&
        elementScroll <= sauceRef.current.offsetTop
      ) {
        dispatch({
          type: GET_CURRENT_TAB,
          currentTab: "one",
        });
      }
      if (
        elementScroll >= sauceRef.current.offsetTop - 30 &&
        elementScroll <= mainRef.current.offsetTop
      ) {
        dispatch({
          type: GET_CURRENT_TAB,
          currentTab: "two",
        });
      }
      if (elementScroll >= mainRef.current.offsetTop) {
        dispatch({
          type: GET_CURRENT_TAB,
          currentTab: "three",
        });
      }
    });
  }, [currentTabClick]);

  return (
    <ul className={styles.list} ref={ulRef}>
      {itemsRequest && <div>...ЗАГРУЗКА</div>}
      {itemsFailed && <div>{errorStatus}</div>}
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6" ref={bunRef}>
          Булки
        </h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "bun"))
            .map((item, index) => (
              <BurgerCard
                item={item}
                key={item._id}
                setUseModalState={setUseModalState}
              />
            ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>
          Соусы
        </h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "sauce"))
            .map((item, index) => (
              <BurgerCard
                item={item}
                key={item._id}
                setUseModalState={setUseModalState}
              />
            ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
          Начинки
        </h3>
        <div className={styles.wrapper}>
          {items
            .filter((item) => sort(item, "main"))
            .map((item, index) => (
              <BurgerCard
                item={item}
                key={item._id}
                setUseModalState={setUseModalState}
              />
            ))}
        </div>
      </li>
    </ul>
  );
}

export default BurgerList;
