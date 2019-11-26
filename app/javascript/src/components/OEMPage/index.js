import React from 'react';
import PageLayout from '../PageLayout';
import OEMBusinesses from '../../containers/OEMBusinesses';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      back={props.id ? (
          undefined
        ) : (
          {text: "back", to: "/"}
        )}
      header={props.name ? props.name : `OEM ${props.id || props.match.params.id}`}
      link={props.match.params.id ? (
          {text: "Update OEM", to: `/oem/${props.match.params.id}/update`}
        ) : (
          undefined
        )}
    >
      <OEMBusinesses id={props.id || props.match.params.id} />
    </PageLayout>
  )
}
