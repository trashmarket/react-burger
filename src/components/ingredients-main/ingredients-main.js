import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./ingredients-main.module.css";
import { useParams } from 'react-router-dom';



export default function IngredientsMain() {
  const [item, setItem] = useState('');
  const { 
    items
    } = useSelector((state) => state.cart);
  const { id } = useParams();

  useEffect(() => {
    setItem(items.find(item => item._id === id));  
  }, [items])

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
