import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import AnimateHeight from 'react-animate-height';
import LargeBar from '@components/Bar/Large';
import SmallBar from '@components/Bar/Small'
import {getBusinessProceduresWithDevices} from '@selectors/business';
import styles from './index.module.css';

const ProcedureDeviceDropdown = ({procedure, setSelection, selection}) => {
  const [isOpen, setIsOpen] = useState();
  const toggle = () => setIsOpen(!isOpen);
  console.log("procedure", procedure);
  return(<>
    <SmallBar text={procedure.name} className={styles.procedureLabel} onClick={toggle} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className={styles.deviceList}>
        {procedure.devices.map(device => <div className={selection === device ? `${styles.deviceItem} ${styles.selected}` : styles.deviceItem} onClick={() => setSelection(device)} key={device.id}>{device.name}</div>)}
      </div>
    </AnimateHeight>
  </>)
}

const ProcedureList = ({procedures}) => {
  const [selection, setSelection] = useState();
  const handleCopyClick = () => {
    console.log("COPYING", selection);
  }
  return(<>
    <div className={styles.list}>
      {procedures.map(procedure => <ProcedureDeviceDropdown key={procedure.id} procedure={procedure} setSelection={setSelection} selection={selection} />)}
    </div>
    <div onClick={selection ? handleCopyClick : undefined} className={selection ? styles.copyButton : `${styles.copyButton} ${styles.disabled}`}>Copy</div>
  </>)
}

const ProcedureListWrapper = ({procedures}) => (
  <div className={styles.wrapper}>
    {(procedures && procedures.length > 0) ? (<>
      <div className={styles.columnTitle}>Select a procedure to view devices</div>
      <ProcedureList procedures={procedures} />
    </>) : (
      <div>No Device Data To Copy</div>
    )}
  </div>
)

const ProcedureListContainer = ({business_id}) => {
  const procedures = useSelector(getBusinessProceduresWithDevices(business_id));
  console.log("procedures", procedures);
  return <ProcedureListWrapper procedures={procedures} />
}

export default ({business_id}) => (
  <div className={styles.container}>
    <LargeBar title="Copy A Device" className={styles.modalHeader} />
    <ProcedureListContainer business_id={business_id} />
  </div>
)
