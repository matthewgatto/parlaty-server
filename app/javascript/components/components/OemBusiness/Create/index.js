import React from 'react';
import uuid from 'uuid/v4';
import FormPage from '@components/Form/Page';
import { clientOrOemBusinessSchema } from '@utils/validation';
import { CREATE_OEM_BUSINESS_REQUEST } from '@types/oem_business';
import withUserInfo from '@containers/withUserInfo';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export default withUserInfo(({user,match:{params}}) => {
  var oem_id, cancel;
  if(params && params.oem_id){
    oem_id = params.oem_id
    cancel = `/oems/${params.oem_id}`
  } else {
    oem_id = user.oem
  }
  return(
    <FormPage
      layout={{header:"New Site"}}
      form={{
        entity: "oem_business",
        url: "/oem_businesses",
        type: CREATE_OEM_BUSINESS_REQUEST,
        initialValues: {},
        extraValues: {oem_id},
        validationSchema: clientOrOemBusinessSchema,
        id: uuid()
      }}
      cancel={cancel}
      inputs={inputs}
    />
  )
})
