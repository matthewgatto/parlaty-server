import React from 'react';
import PageLayout from '../PageLayout';
import BusinessName from '../../containers/BusinessName';
import CreateProcedureForm from '../../containers/CreateProcedureForm';

export default function(props){
  return(
    <PageLayout
      header="New Procedure"
      back={props.match.params.business_id ? ({
        to: props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.business_id}` : `/business/${props.match.params.business_id}`,
        label: <BusinessName id={props.match.params.business_id} />
        }) : ({
          to: "/",
          label: "Home"
        })}
    >
      <CreateProcedureForm
        oem_business_id={props.match.params.business_id}
        to={props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.business_id}` : `/business/${props.match.params.business_id}`}
      />
    </PageLayout>
  )
};
