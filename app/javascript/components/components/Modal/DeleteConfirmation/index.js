import React, {useState} from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import SubmitButton from '@components/SubmitButton';
import styles from './index.module.css';


const DeleteConfirmationLoadingButton = ({text, handleYesClick}) => {
  const [isProcessing, setProcessing] = useState();
  const handleClick = () => {
    if(!isProcessing){
      setProcessing(true);
      handleYesClick();
    }
  };
  return(
    <SubmitButton primary label={text} onClick={handleClick} isProcessing={isProcessing} />
  )
}

export default ({entity, handleYesClick, customText = null}) => (
  <div className={styles.deleteConfirmationModal}>
    <div className={styles.text}>{customText ? customText : 'Are you sure you want to delete this '+entity+'?'}</div>
    <div className={styles.buttons}>
      <DeleteConfirmationLoadingButton text="Yes" handleYesClick={handleYesClick} />
      <ModalTrigger><SubmitButton label="No" className={styles.noButton} /></ModalTrigger>
    </div>
  </div>
)
