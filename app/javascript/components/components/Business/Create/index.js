import React from 'react';
import uuid from 'uuid/v4';
import FormPage from '@components/Form/Page';
import { clientOrCategorySchema } from '@utils/validation';
import { CREATE_BUSINESS_REQUEST } from '@types/business';
import useUserInfo from '@containers/useUserInfo';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export default ({match:{params}}) => {
  const user = useUserInfo();
  var oem_id, cancel;
  if(params && params.oem_id){
    oem_id = params.oem_id
    cancel = `/oems/${params.oem_id}`
  } else {
    oem_id = user.oem
  }
  return(
    <FormPage
      layout={{header:"New Category"}}
      form={{
        entity: "business",
        url: "/oem_businesses",
        type: CREATE_BUSINESS_REQUEST,
        initialValues: {},
        extraValues: {oem_id},
        validationSchema: clientOrCategorySchema,
        id: uuid()
      }}
      cancel={cancel}
      inputs={inputs}
    />
  )
}
