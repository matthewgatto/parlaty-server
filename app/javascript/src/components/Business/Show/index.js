import React from 'react';
import ListPage from '../../List/Page';
import { FETCH_BUSINESS_PROCEDURES_REQUEST } from '../../../redux/types/business';

export default ({match:{params:{id,oem_id}}}) => {
  const p = {
    label: "Procedures",
    header: {
      header: {text: "Business: ", entityKey: "businesses", id},
      link: {text: "Add Procedure"}
    },
    list: {
      id,
      url: `/oem_businesses/${id}/procedures`,
      type: FETCH_BUSINESS_PROCEDURES_REQUEST,
      text: "Procedures",
      entityKey: "procedures",
      action: "update",
      placeholder: "This business has no procedures",
      selector: ({businesses:{byId:{[id]:business}}}) => ((business && business.procedures) ? business.procedures : undefined)
    }
  }
  if(oem_id){
    p.header.back = {to: `/oem/${oem_id}`, label: {entityKey: "oems", id: oem_id}}
    p.header.link.to = `/oem/${oem_id}/business/${id}/procedures/create`
    p.list.to = `/oem/${oem_id}/business/${id}/procedures`
  } else {
    p.header.back = {to: "/", label: "Home"}
    p.header.link.to = `/business/${id}/procedures/create`
    p.list.to = `/business/${id}/procedures`
  }
  return <ListPage {...p} />
}
