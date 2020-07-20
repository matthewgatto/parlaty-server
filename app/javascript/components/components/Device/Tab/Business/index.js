import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '@types/oem_business';
import { getOemBusinessProcedures } from '@selectors/oem_business';

export default ({match:{params:{oem_business_id,oem_id},url}}) => (
  <ListPage
    label="Procedures"
    header={{
      header: "Devices: Choose A Procedure",
      back: {to: oem_id ? `/devices/${oem_id}` : "/devices", label: "Choose A Different Site"}
    }}
    list={{
      id: oem_business_id,
      url: `/oem_businesses/${oem_business_id}/procedures`,
      type: FETCH_BUSINESS_PROCEDURES_REQUEST,
      text: "Procedures",
      entityKey: "procedures",
      placeholder: "This site has no procedures",
      selector: getOemBusinessProcedures(oem_business_id),
      to: url
    }}
  />
)
