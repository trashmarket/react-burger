import React from "react";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
    return (
        <section className={styles.section}>
            <div className={styles.wrapperConstructor}>
            
            <ConstructorElement type="top" isLocked={true} text={props.basket[0].name} price={props.basket[0].price} thumbnail={props.basket[0].image} style={{marginLeft: '20px'}}/>
          
            <ul className={styles.list}>
            {
                props.basket.map((item, index)=> {
                    if(item.type !== 'bun' ) {
                                return <li className={styles.li} key={index}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement   text={item.name} price={item.price} thumbnail={item.image}/>     
                                </li>
                    }
                })
            }
            </ul>
            
            <ConstructorElement type="bottom" isLocked={true} text={props.basket[0].name} price={props.basket[0].price} thumbnail={props.basket[0].image} style={{marginLeft: '20px'}}/>
            
            </div>
            <div className={styles.button}>
            <span className="text text_type_digits-medium" style={{display: 'flex', width: '108px', justifyContent: "space-between", marginRight:'33px'}}>
                610
                <CurrencyIcon type="primary"/>
            </span>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}

BurgerConstructor.protoTypes = {
    basket: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }).isRequired)
}
export default BurgerConstructor;