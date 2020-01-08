import React from 'react';
import ListPage from '../ListPage';
import { FETCH_DEVICES_REQUEST } from '../../redux/types/device';

const deviceListProps = {
  header: { header: "Home", link: { text: "Add Device", to: "/devices/create" }},
  label: "Devices",
  list: {
    url: "/devices",
    text: "Devicess",
    to: "/devices",
    entityKey: "devices",
    action: "update",
    placeholder: "There are no Devices",
    type: FETCH_DEVICES_REQUEST,
    selector: ({devices:{allIds}}) => allIds
  }
}

export default () => <ListPage {...deviceListProps} />