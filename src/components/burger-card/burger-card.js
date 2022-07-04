import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-card.module.css'
const BurgerCard = React.memo((props) => {
    const [count, setCount] = React.useState(null);

    React.useEffect(()=>{
        if (props.index) {
            setCount(props.count);
        }
        else {
            setCount(null)
        }
    },[])


    return (
        <div  className={styles.card} onClick={() => {setCount(count + 1); props.setIngredients(props.item);}}>
            <img className={styles.img} src={props.item.image} alt={props.item.name} />
            <p className={styles.p}> <span className="text text_type_digits-default mr-1 mt-1 mb-1">{props.item.price}</span> <CurrencyIcon className="ml-1"/></p>
            <p className="text text_type_main-default" >{props.item.name}</p>
            {count && <Counter count={count} size="default"/>}
        </div>
    )
})

export default BurgerCard;