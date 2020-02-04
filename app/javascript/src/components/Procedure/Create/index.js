import React from 'react';
import uuid from 'uuid/v4';
import {useSelector} from 'react-redux';
import PageLayout from '@components/PageLayout';
import Name from '@containers/Name';
import ProcedureForm from '../Form';
import { CREATE_PROCEDURE_REQUEST } from '@types/procedure';
import { getUserId } from '@selectors/auth';

export default ({match:{params:{oem_id,business_id}}}) => {
  const author = useSelector(getUserId)
  return(
    <PageLayout
      header="New Procedure"
      back={business_id ? ({
        to: oem_id ? `/oems/${oem_id}/businesses/${business_id}` : `/businesses/${business_id}`,
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
        id={uuid()}
      />
    </PageLayout>
  )
}
