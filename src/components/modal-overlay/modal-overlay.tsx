import React, {PropsWithChildren, FC} from "react";
import styles from './modal-overlay.module.css';
import { useHistory } from 'react-router-dom';
import { TOnClose, TBackgroundState } from '../../services/types-components'

type TModalOverlay = {
  onClose: TOnClose;
} & PropsWithChildren

type TBackgroundStateModal = {
  background: TBackgroundState
}

const ModalOverlay: FC<TModalOverlay> = ({children, onClose}) => {
  const {background} = useHistory<TBackgroundStateModal>().location.state;
  
  return(
    <div className={styles.overlay} onClick={(e) => onClose(e, styles.overlay, background.pathname)}>
      {children}
    </div>
  )
}

export default ModalOverlay;