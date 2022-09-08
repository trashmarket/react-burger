import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import styles from "./ingredients-main.module.css";
import { useParams } from 'react-router-dom';
import { getItems } from "../../services/actions/cart";


export default function IngredientsMain() {
  const [item, setItem] = useState('');
  const dispatch = useDispatch()
  const { 
    items
    } = useSelector((state) => state.cart);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getItems())
  }, [])
  
  useEffect(() => {
    setItem(items.find(item => item._id === id));  
  }, [items])
  console.log(item)

  return (item) && (
    <div className={styles.container}>
    <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
    <div className={styles.content}>
      <img
        src={`${item.image}`}
        alt={item.name}
        width={520}
        height={240}
      />
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
}
