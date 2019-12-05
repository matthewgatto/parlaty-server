import React from 'react';
import PageLayout from '../PageLayout';
import OEMBusinessProcedures from '../../containers/OEMBusinessProcedures';
import BusinessName from '../../containers/BusinessName';
import OEMName from '../../containers/OEMName';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout
      header={<>Business: <BusinessName id={props.match.params.id} /></>}
      back={props.match.params.oem_id ? ({
          to: `/oem/${props.match.params.oem_id}`,
          label: <OEMName id={props.match.params.oem_id} />
        }) : ({
          to: "/",
          label: "Home"
        })}
      link={props.match.params.id ? (
          {text: "Add Procedure", to: props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.id}/procedures/create` : `/business/${props.match.params.id}/procedures/create`}
        ) : (
          undefined
        )}
    >
      <OEMBusinessProcedures
        id={props.match.params.id}
        requestURL={`/oem_businesses/${props.match.params.id}/procedures`}
        requestEntity="businesses"
        text="Procedures"
        entityKey="procedures"
        action="update"
        to={props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.id}/procedures` : `/business/${props.match.params.id}/procedures`}
        placeholder="This business has no procedures"
      />
    </PageLayout>
  )
}
