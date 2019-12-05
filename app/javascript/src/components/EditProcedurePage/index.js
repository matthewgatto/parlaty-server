import React from 'react';
import PageLayout from '../PageLayout';
import BusinessName from '../../containers/BusinessName';
import EditProcedureForm from '../../containers/EditProcedureForm';

export default function(props){
  return(
    <PageLayout
      header="Edit Procedure"
      back={props.match.params.business_id ? ({
        to: props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.business_id}` : `/business/${props.match.params.business_id}`,
        label: <BusinessName id={props.match.params.business_id} />
        }) : ({
          to: "/",
          label: "Home"
        })}
    >
      <EditProcedureForm
        id={props.match.params.id}
        to={props.match.params.oem_id ? `/oem/${props.match.params.oem_id}/business/${props.match.params.business_id}` : `/business/${props.match.params.business_id}`}
      />
    </PageLayout>
  )
};
