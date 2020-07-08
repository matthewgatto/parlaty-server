import React from 'react';
import { useSelector } from 'react-redux';
import FormPage from '@components/Form/Page';
import { oemSchema } from '@utils/validation';
import { UPDATE_OEM_REQUEST } from '@types/oem';
import { getOEMById } from '@selectors/oem';
import withUserInfo from '@containers/withUserInfo'

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export default withUserInfo(({ user, match:{params:{id}}}) => {
  const {name} = useSelector(getOEMById(id)),
        url = `/oems/${id}`,
        backUrl = user.roleable === "ClientAdmin" ? "/" : url;
  return(
    <FormPage
      layout={{
        header:"Edit Client"
      }}
      form={{
        entity: "edit_client",
        type: UPDATE_OEM_REQUEST,
        initialValues: {name},
        validationSchema: oemSchema,
        url,
        id
      }}
      cancel={backUrl}
      inputs={inputs}
    />
  )
})
