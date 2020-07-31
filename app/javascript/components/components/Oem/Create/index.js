import React from 'react';
import uuid from 'uuid/v4'
import FormPage from '@components/Form/Page';
import { clientOrOemBusinessSchema } from '@utils/validation';
import { CREATE_OEM_REQUEST } from '@types/oem';

let inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}, {
  type: "text",
  name: "procedures_limit",
  label: "Procedure Count Limit"
}]

export default ({role}) => (
  <FormPage
    layout={{
      header: "New Client",
      back: {
        to: "/",
        label: "Home"
      }
    }}
    form={{
      entity: "create_client",
      url: "/oems",
      type: CREATE_OEM_REQUEST,
      initialValues: {},
      id: uuid(),
      validationSchema: clientOrOemBusinessSchema
    }}
    inputs={inputs}
    cancel="/"
  />
)
