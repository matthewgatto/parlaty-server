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

export default ({match:{params},history:{goBack}}) => {
  const isAdmin = (params && params.oem_id) ? true : false
  const oem_id = isAdmin ? params.oem_id : useSelector(({auth}) => (auth && auth.roleable_type === "Oem") ? auth.roleable_id : undefined)
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
        id: new Date().getTime(),
        className: "form_container",
        submitOnEnter: true
      }}
      handleCancel={goBack}
      inputs={inputs}
    />
  )
}
