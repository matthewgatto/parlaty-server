import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Loader from '@components/Loader';
import ModalTrigger from '@containers/ModalTrigger';
import withModal from '@containers/withModal';
import { deleteDevice } from '@actions/device';
import styles from './index.module.css';


const DeleteConfirmationLoadingButton = ({text, device_id, procedure_id}) => {
  const [isProcessing, setProcessing] = useState()
  const dispatch = useDispatch();
  const handleClick = () => {
    if(!isProcessing){
      setProcessing(true);
      dispatch(deleteDevice(device_id, procedure_id))
    }
  };
  return(
    <div onClick={handleClick} className={styles.yesButton}>
      {isProcessing ? (
        <Loader fill="#fff" />
      ) : (
        text
      )}
    </div>
  )
}

const DeleteConfirmation = ({procedure_id, modalData}) => (
  <div className={styles.deleteConfirmationModal}>
    <div className={styles.text}>Are you sure you want to delete this device?</div>
    <div className={styles.buttons}>
      <DeleteConfirmationLoadingButton text="Yes" device_id={modalData} procedure_id={procedure_id} />
      <ModalTrigger className={styles.noButton}>No</ModalTrigger>
    </div>
  </div>
)

export default withModal(DeleteConfirmation, "delete_device_confirmation")
