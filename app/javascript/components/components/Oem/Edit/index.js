import React from 'react';
import FormPage from '@components/Form/Page';
import { oemSchema } from '@utils/validation';
import { UPDATE_OEM_REQUEST } from '@types/oem';
import withUserInfo from '@containers/withUserInfo'
import useOemInfo from '@containers/useOemInfo'
import Loader from '@components/List/Loader';

export default withUserInfo(({ user, match:{params:{oem_id, id}}}) => {
  const id_oem = id || oem_id,
        oem = useOemInfo(id_oem),
        url = `/oems/${id_oem}`,
        backUrl = user.roleable === "ClientAdmin" ? "/" : `/clients/${id_oem}`;

  const inputs = [{
    type: "text",
    name: "name",
    label: "Name*",
    required: true
  }, {
    type: "text",
    name: "procedures_limit",
    label: "Procedure Count Limit",
    defaultValue: oem && oem.procedures_limit || "",
    disabled: user.roleable === "ClientAdmin"
  }]

  const formParams = {
    entity: "edit_client",
    type: UPDATE_OEM_REQUEST,
    initialValues: oem,
    validationSchema: oemSchema,
    url,
    id_oem
  }
  if(!oem){
    return <Loader text="oem" />
  }
  return(
    <FormPage
      layout={{
        header:"Edit Client"
      }}
      form={formParams}
      cancel={backUrl}
      inputs={inputs}
    />
  )
})
