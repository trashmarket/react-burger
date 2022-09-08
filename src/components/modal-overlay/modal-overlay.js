import React from "react";
import styles from './modal-overlay.module.css';
import {modalType} from "../../utils/types";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {  useHistory } from 'react-router-dom';

function ModalOverlay(props){
  const history = useHistory();
  const dispatch = useDispatch();
    function clickOverlay(e) {
        if (e.target.classList.contains(styles.overlay)){
          history.goBack()
          props.setNewIngredintmodal(null)
        }
    }

    return(
        <div className={styles.overlay} onClick={clickOverlay}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
  setNewIngredintmodal: PropTypes.func.isRequired
}

export default ModalOverlay;