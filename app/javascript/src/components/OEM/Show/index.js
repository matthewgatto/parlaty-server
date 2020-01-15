import React from 'react';
import ListPage from '../../List/Page';
import { FETCH_OEM_BUSINESSES_REQUEST } from '../../../redux/types/oem';

export default ({match:{url,params:{id}}}) => (
  <ListPage
    label="Businesses"
    header={{header: {text: "OEM: ", entityKey: "oems", id}, back: {to: "/", label: "Home"}, link: [{text: "Update OEM", to: `${url}/update`}]}}
    list={{
      id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      url: `${url}/oem_businesses`,
      text: "Businesses",
      entityKey: "businesses",
      to: `${url}/businesses`,
      placeholder: "This OEM has no businesses",
      selector: ({oems:{byId:{[id]:oem}}}) => ((oem && oem.businesses) ? oem.businesses : undefined)
    }}
  />
)
