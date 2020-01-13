import React from 'react';
import {useSelector} from 'react-redux'
import ListPage from '../../ListPage';
import { FETCH_OEM_BUSINESSES_REQUEST } from '../../../redux/types/oem';

export default ({match: {params}}) => {
  const isAdmin = (params && params.id) ? true : false
  const id = isAdmin ? params.id : useSelector(({auth}) => (auth && auth.roleable_type === "Oem") ? auth.roleable_id : undefined)
  const p = {
    label: "Businesses",
    list: {
      id,
      type: FETCH_OEM_BUSINESSES_REQUEST,
      url: `/oems/${id}/oem_businesses`,
      text: "Businesses",
      entityKey: "businesses",
      selector: ({oems:{byId:{[id]:oem}}}) => ((oem && oem.businesses) ? oem.businesses : undefined)
    }
  }
  if(isAdmin){
    p.header = {header: {text: "OEM: ", entityKey: "oems", id}, back: {to: "/", label: "Home"}, link: [{text: "Update OEM", to: `/oem/${id}/update`}]}
    p.list.to = `/oem/${id}/business`
    p.list.placeholder = "This OEM has no businesses"
  } else {
    p.header = {header: "Home", link: {text: "Add Business", to: "/business/create"}}
    p.list.to = "/business"
    p.list.placeholder = "You have no businesses"
  }
  return <ListPage {...p} />
}
