import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '@types/business';
import { getBusinessProcedures } from '@selectors/business';

export default ({match:{params:{business_id,oem_id},url}}) => (
  <ListPage
    label="Procedures"
    header={{
      header: "Devices: Choose A Procedure",
      back: {to: oem_id ? `/devices/${oem_id}` : "/devices", label: "Choose A Different Category"}
    }}
    list={{
      id: business_id,
      url: `/oem_businesses/${business_id}/procedures`,
      type: FETCH_BUSINESS_PROCEDURES_REQUEST,
      text: "Procedures",
      entityKey: "procedures",
      placeholder: "This category has no procedures",
      selector: getBusinessProcedures(business_id),
      to: url
    }}
  />
)
