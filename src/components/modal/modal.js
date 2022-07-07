import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import PropTypes from "prop-types";
import {modalType} from "../../utils/types"


const modalRoot = document.getElementById('modal-root')

function Modal(props){
    return ReactDOM.createPortal(
        <ModalOverlay deadModal={props.deadModal}>
            <div className={styles.modal}>
                {props.children}
            </div>
        </ModalOverlay>,
        modalRoot
    )
}

Modal.protoTypes = modalType;

export default Modal;