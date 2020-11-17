import React,{useState} from 'react';
import {useSelector,useDispatch,connect} from 'react-redux';
import AnimateHeight from 'react-animate-height';
import LargeBar from '@components/Bar/Large';
import SmallBar from '@components/Bar/Small'
import {getOemBusinessById} from '@selectors/oem_business';
import {getProcedureById} from '@selectors/procedure';
import {getDeviceById} from '@selectors/device';
import { setModal } from '@actions/modal';
import styles from './index.module.css';

const ProcedureDevice = ({id, setSelection, selection}) => {
  const device = useSelector(getDeviceById(id));
  const handleClick = () => setSelection(device);
  if(device.parent_id > 0) {
    return false;
  }
  return <div className={selection === device ? `${styles.deviceItem} ${styles.selected}` : styles.deviceItem} onClick={handleClick}>{device && device.machine_tag + ' - ' + device.name || null}</div>
};


const ProcedureDeviceDropdown = ({procedure, setSelection, selection}) => {
  const [isOpen, setIsOpen] = useState();
  const toggle = () => setIsOpen(!isOpen);
  return(<>
    <SmallBar text={procedure.name} className={styles.procedureLabel} onClick={toggle} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className={styles.deviceList}>
        {procedure.devices.map(deviceId => <ProcedureDevice key={deviceId} id={deviceId} setSelection={setSelection} selection={selection} />)}
      </div>
    </AnimateHeight>
  </>)
};

const ProcedureDeviceDropdownContainer = ({id, ...props}) => {
  const procedure = useSelector(getProcedureById(id));
  if(procedure && procedure.devices && procedure.devices.length > 0){
    return <ProcedureDeviceDropdown {...props} procedure={procedure} />
  }
  return null
};

const ProcedureList = ({procedures}) => {
  const [selection, setSelection] = useState();
  const dispatch = useDispatch();
  const handleCopyClick = () => dispatch(setModal("create_device", selection));
  return(<>
    <div className={styles.list}>
      {procedures.map(procedureId => <ProcedureDeviceDropdownContainer key={procedureId} id={procedureId} setSelection={setSelection} selection={selection} />)}
    </div>
    <div onClick={selection ? handleCopyClick : undefined} className={selection ? styles.copyButton : `${styles.copyButton} ${styles.disabled}`}>Copy</div>
  </>)
};

const ProcedureListWrapper = ({procedures}) => (
  <div className={styles.wrapper}>
    {(procedures && procedures.length > 0) ? (<>
      <span className={styles.columnTitle}>Select a procedure to view devices</span>
      <ProcedureList procedures={procedures} />
    </>) : (
      <span>No Device Data To Copy</span>
    )}
  </div>
);

const ProcedureListContainer = ({oem_business_id}) => {
  const oem_business = useSelector(getOemBusinessById(oem_business_id));
  return <ProcedureListWrapper procedures={oem_business.procedures} />
};

export default ({oem_business_id}) => (
  <div className={styles.container}>
    <LargeBar title="Copy A Device" className={styles.modalHeader} />
    <ProcedureListContainer oem_business_id={oem_business_id} />
  </div>
)
