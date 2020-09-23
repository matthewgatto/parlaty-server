import React, { useEffect, useRef, useState } from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import ModalList from '@components/ModalList';
import CloseIcon from '@components/SVG/Close';
import styles from './index.module.css';
import { useSelector} from "react-redux";
import { getModal } from '@selectors/modal';

export default ({children}) => {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const modal = useSelector(getModal),
    params = modal && modal.data && modal.data.isArrParams || null;
  useEffect(()=> {
    ref.current.childElementCount ? setIsShow(true) : setIsShow(false);
  }, [modal]);
  return (
    <div className={`${styles.container} ${!isShow ? styles.displayNone : ''}`}>
      <div className={styles.content}>
        <ModalTrigger className={styles.closeButton}><CloseIcon className={styles.closeIcon} /></ModalTrigger>
        <div className={styles.window}>
          <div ref={ref} className={styles.contain}>{children}</div>
          {params && <ModalList params={params} />}
        </div>
      </div>
    </div>
  )
}
