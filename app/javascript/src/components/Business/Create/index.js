import React from 'react';
import {useSelector} from 'react-redux'
import FormPage from '../../FormPage';
import { businessSchema } from '../../../utils/validation';
import { CREATE_BUSINESS_REQUEST } from '../../../redux/types/business';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export default ({match:{params}}) => {
  var oem_id, cancel;
  if(params && params.oem_id){
    oem_id = params.oem_id
    cancel = `/oems/${params.oem_id}`
  } else {
    oem_id = useSelector(({auth}) => (auth && auth.roleable_type === "Oem") ? auth.roleable_id : undefined)
  }
  return(
    <FormPage
      header="New Business"
      options={{
        entity: "business",
        url: "/oem_businesses",
        type: CREATE_BUSINESS_REQUEST,
        initialValues: {email: ''},
        extraValues: {oem_id},
        validationSchema: businessSchema,
        id: new Date().getTime()
      }}
      cancel={cancel}
      inputs={inputs}
    />
  )
}
