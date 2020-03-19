import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '@types/business';
import { getBusinessProcedures } from '@selectors/business';

export default ({match:{params:{id,oem_id},url}}) => (
  <ListPage
    label="Procedures"
    header={{
      header: {text: "Category: ", entityKey: "businesses", id},
      link: {text: "Add Procedure", to: `${url}/procedures/create`},
      back: oem_id ? {to: `/oems/${oem_id}`, label: {entityKey: "oems", id: oem_id}} : {to: "/", label: "Home"}
    }}
    list={{
      id,
      url: `/oem_businesses/${id}/procedures`,
      type: FETCH_BUSINESS_PROCEDURES_REQUEST,
      text: "Procedures",
      entityKey: "procedures",
      action: "update",
      placeholder: "This category has no procedures",
      selector: getBusinessProcedures(id),
      to: `${url}/procedures`
    }}
  />
)
