import { useSelector } from "../../services/hooks";
import { useEffect, useState } from "react";
import styles from "./ingredients-main.module.css";
import { useParams } from "react-router-dom";
import { selectCart } from "../../services/actions/cart";
import { TItems } from "../../services/types/data";
export default function IngredientsMain() {
  const [item, setItem] = useState<TItems | boolean | undefined>(false);
  const { items } = useSelector(selectCart);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
     setItem(items.find(item => item._id === id));  
  }, [items, item, id])

  return (
    item !== true &&
    item !== undefined &&
    item !== false && (
      <div className={styles.container}>
        <h2 className={`text text_type_main-large ${styles.title}`}>
          Детали ингредиента
        </h2>
        <div className={styles.content}>
          <img src={`${item.image}`} alt={item.name} width={520} height={240} />
          <p className="text text_type_main-medium">{item.name}</p>
          <ul className={styles.ul}>
            <li className="text text_type_main-default">
              <span>Калории,ккал</span>
              {item.calories}
            </li>
            <li className="text text_type_main-default">
              <span>Белки, г</span>
              {item.proteins}
            </li>
            <li className="text text_type_main-default">
              <span>Жиры, г</span>
              {item.fat}
            </li>
            <li className="text text_type_main-default">
              <span>Углеводы, г</span>
              {item.carbohydrates}
            </li>
          </ul>
        </div>
      </div>
    )
  );
}
