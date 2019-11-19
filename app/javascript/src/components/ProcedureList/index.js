import React from 'react';
import ProcedureItem from '../../containers/ProcedureItem';
import styles from './index.module.css';

export default function({procedures, business_id}){
  return(
    <div className={styles.container}>
      {(procedures && procedures.length > 0) ? procedures.map(procedure =>
        <ProcedureItem key={procedure} business_id={business_id} id={procedure} />
      ) : <div>No procedures</div>}
    </div>
  )
}
