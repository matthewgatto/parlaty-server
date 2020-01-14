import React from 'react';
import {useSelector} from 'react-redux';
import PageLayout from '../../PageLayout';
import Name from '../../../containers/Name';
import ProcedureForm from '../Form';
import { CREATE_PROCEDURE_REQUEST } from '../../../redux/types/procedure';

export default ({match:{params:{oem_id,business_id}}}) => {
  const author = useSelector(({auth}) => auth.user_id)
  return(
    <PageLayout
      header="New Procedure"
      back={business_id ? ({
        to: oem_id ? `/oem/${oem_id}/business/${business_id}` : `/business/${business_id}`,
        label: <Name entityKey="businesses" id={business_id} />
        }) : ({
          to: "/",
          label: "Home"
        })}
    >
      <ProcedureForm
        url="/procedures"
        type={CREATE_PROCEDURE_REQUEST}
        initialValues={{description: ''}}
        extraValues={{author, oem_business_id: business_id}}
        id={new Date().getTime()}
      />
    </PageLayout>
  )
}
