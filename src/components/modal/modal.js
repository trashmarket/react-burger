import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import React from "react";
import { modalType } from "../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal-root");

function Modal(props) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      props.closeModal(null);
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
        <div className={styles.close} onClick={() => props.closeModal(null)}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.protoTypes = modalType;

export default Modal;
