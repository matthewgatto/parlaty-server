import React from 'react';
import ListPage from '../List/Page';
import { FETCH_OEMS_REQUEST } from '../../redux/types/oem';

const oemListProps = {
  label: "OEMs",
  header: { header: "Home", link: { text: "Invite OEM", to: "/invite/oem" }},
  list: {
    text: "OEMs",
    to: "/oems",
    entityKey: "oems",
    placeholder: "There are no OEMs",
    type: FETCH_OEMS_REQUEST,
    selector: ({oems:{allIds}}) => allIds,
    url: "/oems"
  }
}

export default () => <ListPage {...oemListProps} />
