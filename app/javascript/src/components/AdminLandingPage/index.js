import React from 'react';
import PageLayout from '../PageLayout';
import OEMList from '../../containers/OEMList';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      header="Admin Landing Page"
      link={{text: "Send OEM Invite", to: '/invite/oem'}}
    >
      <OEMList />
    </PageLayout>
  )
}
