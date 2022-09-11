import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import React from "react";
import { modalType } from "../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { GET_ITEM_CART } from "../../services/actions/cart";
import {  useHistory } from 'react-router-dom';

const modalRoot = document.getElementById("modal-root");

function Modal({ onClose, children }) {
  React.useEffect(() => {
    document.addEventListener("keydown", onClose);
    return () => {
      document.removeEventListener("keydown", onClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        {children}
        <div
          className={styles.close}
          onClick={(e) => {
            onClose(e, 'button')
          }
            
          }
        >
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
