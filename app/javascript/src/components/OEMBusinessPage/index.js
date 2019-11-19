import React from 'react';
import PageLayout from '../PageLayout';
import OEMBusinessProcedures from '../../containers/OEMBusinessProcedures';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      header={`OEM Business ${props.match.params.id}`}
      link={props.match.params.id ? (
          {text: "Add Procedure", to: `/business/${props.match.params.id}/procedures/create`}
        ) : (
          undefined
        )}
    >
      <OEMBusinessProcedures id={props.match.params.id} />
    </PageLayout>
  )
}
