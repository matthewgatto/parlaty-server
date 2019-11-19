import React from 'react';
import PageLayout from '../PageLayout';
import OEMForm from '../../containers/OEMUpdateForm';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      header={`Update OEM ${props.match.params.id}`}
    >
      <OEMForm id={props.match.params.id} />
    </PageLayout>
  )
}
