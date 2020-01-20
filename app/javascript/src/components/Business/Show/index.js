import React from 'react';
import ListPage from '../../List/Page';
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '../../../redux/types/business';
import { getBusinessProcedures } from '../../../redux/selectors/business';

export default ({match:{params:{id,oem_id},url}}) => (
  <ListPage
    label="Procedures"
    header={{
      header: {text: "Business: ", entityKey: "businesses", id},
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
      placeholder: "This business has no procedures",
      selector: getBusinessProcedures(id),
      to: `${url}/procedures`
    }}
  />
)
