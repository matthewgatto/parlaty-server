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
}]

export default ({match:{params:{id}}}) => {
  const {name} = useSelector(getOEMById(id)),
        url = `/oems/${id}`;
  return(
    <FormPage
      layout={{
        header:"Update Client"
      }}
      form={{
        entity: "update_client",
        type: UPDATE_OEM_REQUEST,
        initialValues: {name},
        validationSchema: oemSchema,
        url,
        id
      }}
      cancel={url}
      inputs={inputs}
    />
  )
}
