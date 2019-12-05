import React from 'react';
import PageLayout from '../PageLayout';
import OEMList from '../../containers/OEMList';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      header="Home"
      link={{text: "Invite OEM", to: '/invite/oem'}}
    >
      <OEMList
        requestURL="/oems"
        requestEntity="landing"
        text="OEMs"
        to="/oem"
        entityKey="oems"
        placeholder="There are no OEMs"
      />
    </PageLayout>
  )
}
