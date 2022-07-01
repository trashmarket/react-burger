import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-card.module.css'
function BurgerCard(props) {
    const [count, setCount] = React.useState(null);

    React.useEffect(()=>{
        if (props.index) {
            setCount(count + 1)
        }else {
            setCount(null)
        }
    },[])


    return (
        <div className="pl-1 pr-1 ml-1" style={{width: "272px", position:"relative"}} onClick={() => setCount(count + 1)}>
            <img className={styles.img} src={props.item.image} alt={props.item.name} />
            <p className={styles.p}> <span className="text text_type_digits-default mr-1 mt-1 mb-1">{props.item.price}</span> <CurrencyIcon className="ml-1"/></p>
            <p className="text text_type_main-default" style={{textAlign: 'center'}}>{props.item.name}</p>
            {count && <Counter count={count} size="default"/>}
        </div>
    )
}

export default BurgerCard;