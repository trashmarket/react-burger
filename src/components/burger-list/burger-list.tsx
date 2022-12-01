import React, {
  useEffect,
  useRef,
  FC,
} from "react";
import BurgerCard from "../burger-card/burger-card";
import styles from "./burger-list.module.css";
import { sort } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getcCurrentTabAction } from "../../services/actions/cart";
import { TSetUseModalState } from "../../services/types-components";
import { TItems } from "../../services/types/data";
import { selectCart } from "../../services/actions/cart";

type TsetProps = {
  setUseModalState: TSetUseModalState<TItems>;
};
const BurgerList: FC<TsetProps> = ({ setUseModalState }) => {
  const dispatch = useDispatch();
  const { items, itemsRequest, itemsFailed, errorStatus, currentTabClick } =
    useSelector(selectCart);
  const ulRef = useRef<any>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (currentTabClick === "bun" && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (currentTabClick === "sauce" && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (currentTabClick === "main" && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }

    ulRef.current.addEventListener(
      "scroll",
      (e: React.UIEvent<HTMLUListElement>) => {
        const elementScroll = e.currentTarget.scrollTop;

        if (sauceRef.current !== null && bunRef.current !== null) {
          if (
            elementScroll >= bunRef.current.offsetTop &&
            elementScroll <= sauceRef.current.offsetTop
          ) {
            dispatch(getcCurrentTabAction("one"));
          }
        }

        if (mainRef.current !== null && sauceRef.current !== null) {
          if (
            elementScroll >= sauceRef.current.offsetTop - 30 &&
            elementScroll <= mainRef.current.offsetTop
          ) {
            dispatch(getcCurrentTabAction("two"));
          }
        }

        if (mainRef.current !== null) {
          if (elementScroll >= mainRef.current.offsetTop) {
            dispatch(getcCurrentTabAction("three"));
          }
        }
      }
    );
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
            .filter((item: TItems) => sort(item, "bun"))
            .map((item: TItems) => (
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
            .filter((item: TItems) => sort(item, "sauce"))
            .map((item: TItems) => (
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
            .filter((item: TItems) => sort(item, "main"))
            .map((item: TItems) => (
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
};

export default BurgerList;
