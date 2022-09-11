import React from "react";
import styles from './modal-overlay.module.css';
import {modalType} from "../../utils/types";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {  useHistory } from 'react-router-dom';

function ModalOverlay({children, onClose}){


  return(
    <div className={styles.overlay} onClick={(e) => onClose(e, styles.overlay)}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;