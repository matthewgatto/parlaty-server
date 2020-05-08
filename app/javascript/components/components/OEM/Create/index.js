import React from 'react';
import uuid from 'uuid/v4'
import FormPage from '@components/Form/Page';
import { clientOrCategorySchema } from '@utils/validation';
import { CREATE_OEM_REQUEST } from '@types/oem';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
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
      url: "/oem",
      type: CREATE_OEM_REQUEST,
      initialValues: {},
      id: uuid(),
      validationSchema: clientOrCategorySchema
    }}
    inputs={inputs}
    cancel="/"
  />
)
