import React from "react";
import styles from './modal-overlay.module.css';
import {modalType} from "../../utils/types";
import { useDispatch } from "react-redux";
import { GET_ITEM_CART } from '../../services/actions/cart'
function ModalOverlay(props){
  const dispatch = useDispatch()
    function clickOverlay(e) {
        if (e.target.classList.contains(styles.overlay)){
          dispatch({
            type: GET_ITEM_CART,
            itemCart: {},
            currentModal: ''
          })
        }
    }

    return(
        <div className={styles.overlay} onClick={clickOverlay}>
            {props.children}
        </div>
    )
}

ModalOverlay.protoTypes = modalType;

export default ModalOverlay;