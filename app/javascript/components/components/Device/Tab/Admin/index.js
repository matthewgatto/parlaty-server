import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_OEMS_REQUEST } from '@types/oem';
import { getAllOemIds } from '@selectors/oem';

const oemListProps = {
  label: "Clients",
  header: { header: "Devices: Choose A Client"},
  list: {
    text: "Clients",
    to: "/devices",
    entityKey: "oems",
    placeholder: "There are no clients",
    type: FETCH_OEMS_REQUEST,
    selector: getAllOemIds,
    url: "/oems"
  }
}

export default ({match:{url}}) => <ListPage {...oemListProps} />
