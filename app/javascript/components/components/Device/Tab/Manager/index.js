import React from 'react';
import SubmitButton from '@components/SubmitButton';
import BackLink from '@components/BackLink';
import DeviceManagerPage from '@components/Procedure/DeviceManagerPage';

export default ({match:{params:{oem_id,oem_business_id,procedure_id}}}) => (
  <DeviceManagerPage
    back={{to: oem_id ? `/devices/${oem_id}/${oem_business_id}` : `/devices/${oem_business_id}`, text: "Choose A Different Procedure"}}
    procedure_id={procedure_id}
    oem_business_id={oem_business_id}
    header="Manage"
    subheader="Add, copy, or update devices for this procedure"
    top={<BackLink to={oem_id ? `/devices/${oem_id}/${oem_business_id}` : `/devices/${oem_business_id}`}>Choose Another Procedure</BackLink>}
  />
)
