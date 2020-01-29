import React from 'react';
import { useSelector } from 'react-redux';
import FormPage from '@components/Form/Page';
import { oemSchema } from '@utils/validation';
import { UPDATE_OEM_REQUEST } from '@types/oem';
import { getOEMById } from '@selectors/oem';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}, {
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}, {
  type: "password",
  name: "password",
  label: "New Password*"
}]

export default ({match:{params:{id}}}) => {
  const {name,email} = useSelector(getOEMById(id)),
        url = `/oems/${id}`;
  return(
    <FormPage
      header="Update OEM"
      form={{
        entity: "update_oem",
        type: UPDATE_OEM_REQUEST,
        initialValues: {name,email},
        validationSchema: oemSchema,
        url,
        id
      }}
      cancel={url}
      inputs={inputs}
    />
  )
}
