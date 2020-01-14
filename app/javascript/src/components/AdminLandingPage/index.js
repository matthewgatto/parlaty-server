import React from 'react';
import ListPage from '../List/Page';
import { FETCH_OEMS_REQUEST } from '../../redux/types/oem';

const oemListProps = {
  header: { header: "Home", link: { text: "Invite OEM", to: "/invite/oem" }},
  label: "OEMs",
  list: {
    url: "/oems",
    text: "OEMs",
    to: "/oem",
    entityKey: "oems",
    placeholder: "There are no OEMs",
    type: FETCH_OEMS_REQUEST,
    selector: ({oems:{allIds}}) => allIds
  }
}

export default () => <ListPage {...oemListProps} />
