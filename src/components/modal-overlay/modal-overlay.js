import React from "react";
import styles from './modal-overlay.module.css';
import {modalType} from "../../utils/types";
import PropTypes from "prop-types";


function ModalOverlay(props){
    function clickOverlay(e) {
        if (e.target.classList.contains('modal-overlay_overlay__B7gln')){
            props.closeModal(null)
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