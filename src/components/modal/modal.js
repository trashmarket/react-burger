import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import React from "react";
import { modalType } from "../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { GET_ITEM_CART } from "../../services/actions/cart";
const modalRoot = document.getElementById("modal-root");

function Modal(props) {
  const dispatch = useDispatch();

  function handleEscClose(e) {
    if (e.key === "Escape") {
      dispatch({
        type: GET_ITEM_CART,
        itemCart: {},
        currentModal: ''
      });
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={props.closeModal}>
      <div className={styles.modal}>
        {props.children}
        <div
          className={styles.close}
          onClick={() =>
            dispatch({
              type: GET_ITEM_CART,
              itemCart: {},
              currentModal: ''
            })
          }
        >
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.protoTypes = modalType;

export default Modal;
