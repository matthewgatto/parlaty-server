import React from 'react';
import { useSelector } from 'react-redux';
import FormPage from '../../FormPage';
import { oemSchema } from '../../../utils/validation';
import { UPDATE_OEM_REQUEST } from '../../../redux/types/oem';

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

export default ({history:{push},match:{params:{id}}}) => {
  const initialValues = useSelector(({oems:{byId:{[id]:oem}}}) => oem ? ({id: oem.id, name: oem.name, email: oem.email}) : undefined);
  console.log("INITIAL VALUES", initialValues);
  return(
    <FormPage
      header="Update OEM"
      form={{
        entity: "oem",
        url: `/oems/${id}`,
        type: UPDATE_OEM_REQUEST,
        validationSchema: oemSchema,
        className: "form_container",
        submitOnEnter: true,
        id,
        initialValues
      }}
      handleCancel={() => {push(`/oem/${id}`)}}
      inputs={inputs}
    />
  )
}
