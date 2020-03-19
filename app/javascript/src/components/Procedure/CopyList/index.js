import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import LargeBar from '@components/Bar/Large';
import SmallBar from '@components/Bar/Small'
import {getBusinessById} from '@selectors/business';
import {getProcedureById} from '@selectors/procedure';
import {copyProcedure} from '@actions/procedure';
import styles from './index.module.css';


const ProcedureItem = ({id, setSelection, selection}) => {
  const procedure = useSelector(getProcedureById(id))
  const handleClick = () => setSelection(procedure);
  return <SmallBar text={procedure.name} className={styles.procedureLabel} onClick={handleClick} color={selection === procedure} />
}

const ProcedureList = ({procedures, procedureData, oem_business_id}) => {
  const [selection, setSelection] = useState();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch()
  const handleCopyClick = () => {
    setIsLoading(true)
    dispatch(copyProcedure(selection.id, {oem_business_id, ...procedureData}))
  }
  const notDisabled = selection && !isLoading
  return(<>
    <div className={styles.list}>
      {procedures.map(procedureId => <ProcedureItem key={procedureId} id={procedureId} setSelection={setSelection} selection={selection} />)}
    </div>
    <div onClick={notDisabled ? handleCopyClick : undefined} className={notDisabled ? styles.copyButton : `${styles.copyButton} ${styles.disabled}`}>Copy</div>
  </>)
}

const ProcedureListWrapper = ({procedures, procedureData, oem_business_id}) => (
  <div className={styles.wrapper}>
    {(procedures && procedures.length > 0) ? (<>
      {/*<div className={styles.columnTitle}>Select a procedure to view devices</div>*/}
      <ProcedureList procedures={procedures} oem_business_id={oem_business_id} procedureData={procedureData} />
    </>) : (
      <div>No Procedure Data To Copy</div>
    )}
  </div>
)

const ProcedureListContainer = ({business_id, procedureData}) => {
  const business = useSelector(getBusinessById(business_id));
  return <ProcedureListWrapper procedures={business.procedures} oem_business_id={business_id} procedureData={procedureData} />
}

export default ({business_id, modalData}) => (
  <div className={styles.container}>
    <LargeBar title="Copy A Procedure" className={styles.modalHeader} />
    <ProcedureListContainer business_id={business_id} procedureData={modalData} />
  </div>
)
