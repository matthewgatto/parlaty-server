import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import { getOEMBusinesses } from '@selectors/oem';

export default ({match:{url,params:{id}}}) => (
  <ListPage
    label="Categories"
    header={{header: {text: "Category: ", entityKey: "oems", id}, back: {to: "/", label: "Home"}, link: {text: "Add Category", to: `${url}/businesses/create`}}}
    list={{
      id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      url: `${url}/oem_businesses`,
      text: "Categories",
      entityKey: "businesses",
      to: `${url}/businesses`,
      placeholder: "This client has no categories",
      selector: getOEMBusinesses(id)
    }}
  />
)
