import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import { getOEMBusinesses } from '@selectors/oem';

export default ({match:{url,params:{oem_id}}}) => (
  <ListPage
    label="Categories"
    header={{header: "Devices: Choose A Category", back: {to: "/devices", label: "Choose A Different Client"}}}
    list={{
      url: `/oems/${oem_id}/oem_businesses`,
      id: oem_id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      text: "Businesses",
      entityKey: "businesses",
      to: url,
      placeholder: "This client has no categories",
      selector: getOEMBusinesses(oem_id)
    }}
  />
)
