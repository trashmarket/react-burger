import React from "react";
import BurgerCard from "../burger-card/burger-card";
import styles from "./burger-list.module.css";
import ScrollTrack from "../scroll-track/scroll-track";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

function BurgerList({ data, setIngredients }) {
  const sort = (item, type) => {
    if (item.type === type) return item;
  };

  const list = React.useRef(null);

  const [bun, setBun] = React.useState(
    data.filter((item) => {
      return sort(item, "bun");
    })
  );
  const [sauce, setSauce] = React.useState(
    data.filter((item) => {
      return sort(item, "sauce");
    })
  );
  const [main, setMain] = React.useState(
    data.filter((item) => {
      return sort(item, "main");
    })
  );

  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    list.current.addEventListener("scroll", (e) => {
      setScroll(e.currentTarget.scrollTop * 1.14);
    });
  }, []);

  return (
    <ul className={styles.list} ref={list}>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
        <div className={styles.wrapper}>
          {bun.map((item, index) => (
            <BurgerCard
              index={index === 0 ? true : false}
              item={item}
              count={index === 0 ? 1 : null}
              key={item._id}
              setIngredients={setIngredients}
            />
          ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
        <div className={styles.wrapper}>
          {sauce.map((item, index) => (
            <BurgerCard
              index={index === 1 ? true : false}
              count={index === 1 ? 1 : null}
              item={item}
              key={item._id}
              setIngredients={setIngredients}
            />
          ))}
        </div>
      </li>
      <li>
        <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
        <div className={styles.wrapper}>
          {main.map((item, index) => (
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
              setIngredients={setIngredients}
            />
          ))}
        </div>
      </li>

      {/* <ScrollTrack scroll={scroll} /> */}
    </ul>
  );
}

BurgerList.protoTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType).isRequired),

  setIngredients: PropTypes.func,
};

export default BurgerList;
