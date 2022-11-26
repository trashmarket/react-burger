import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import React, {FC, KeyboardEventHandler} from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {  useHistory, useLocation } from 'react-router-dom';
import { TOnClose } from "../../services/types-components";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

type TModal = {
  onClose: TOnClose;
  children: any;
}

const Modal: FC<TModal> = ({ onClose, children }) => {
  const {background} = useHistory<{background:any}>().location.state;
  const location = useLocation()
  
  React.useEffect(() => {
    const handelClick = (e: KeyboardEvent) => {
      onClose(e, null, background.pathname)
    }
    document.addEventListener("keydown", handelClick);
    return () => {
    document.removeEventListener("keydown", handelClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        {children}
        <div
          className={styles.close}
          onClick={(e) => {
            onClose(e, 'button', background.pathname)
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
