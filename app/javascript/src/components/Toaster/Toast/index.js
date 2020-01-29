import React,{useEffect} from 'react';
import Check from '@components/SVG/Check';
import Alert from '@components/SVG/Alert';
import styles from './index.module.css';

export default ({toast,handleRemove}) => {
  const isSuccess = toast.status === "success";
  const removeSelf = handleRemove(toast.id);
  useEffect(() => {
    const timer = setTimeout(removeSelf, 8000);
    return () => {
      clearTimeout(timer);
    }
  },[])
  return(
    <span className={styles.container} style={{"backgroundColor": isSuccess ? "#70b771" : "#ca5e58"}} onClick={removeSelf}>
      {isSuccess ? (
        <Check className={styles.statusIcon} />
      ) : (
        <Alert className={styles.statusIcon} />
      )}
      <div className={styles.message}>
        <div className={styles.text}>{toast.text}</div>
      </div>
    </span>
  )
}
