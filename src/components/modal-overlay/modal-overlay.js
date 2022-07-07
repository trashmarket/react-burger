import React from "react";
import styles from './modal-overlay.module.css';
import {modalType} from "../../utils/types";
import PropTypes from "prop-types";


function ModalOverlay(props){
    function clickOverlay(e) {
        if (e.target.classList.contains('modal-overlay_overlay__B7gln')){
            props.deadModal(null)
        }
    }

    function handleEscClose(e) {
        if (e.key === 'Escape') {
            props.deadModal(null)
        }
    }

    React.useEffect(() => {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose)
      }
    }, [])

    return(
        <div className={styles.overlay} style={{opacity:'1',visibility:'visible'}} onClick={clickOverlay}>
            {props.children}
        </div>
    )
}

ModalOverlay.protoTypes = modalType;

export default ModalOverlay;