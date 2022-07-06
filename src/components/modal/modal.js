import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
const modalRoot = document.getElementById('modal-root')

function Modal(props){
    return ReactDOM.createPortal(
        <ModalOverlay deadModal={props.deadModal}>
            <div className={styles.modal}>
                <h2 className="text text_type_main-large">Детали ингредиента</h2>
                <div className={styles.content}>
                    <img src={`${props.ingredient.image}`} alt={props.ingredient.name} width={520} height={240}/>
                    <p className="text text_type_main-medium">{props.ingredient.name}</p>
                    <ul className={styles.ul}>
                        <li className="text text_type_main-default">
                            <span>Калории,ккал</span>
                            {props.ingredient.calories}
                        </li>
                        <li className="text text_type_main-default">
                            <span>Белки, г</span>
                            {props.ingredient.proteins}
                        </li>
                        <li className="text text_type_main-default">
                            <span>Жиры, г</span>
                            {props.ingredient.fat}
                        </li>
                        <li className="text text_type_main-default"> 
                            <span>Углеводы, г</span>
                            {props.ingredient.carbohydrates}
                        </li>
                    </ul>
                </div>
                <div className={styles.close} onClick={() => props.deadModal(null)}><CloseIcon type="primary"/></div>
            </div>
        </ModalOverlay>,
        modalRoot
    )
}

export default Modal;