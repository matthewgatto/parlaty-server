import React from 'react';
import ListPage from '@components/List/Page';
import { FETCH_OEMS_REQUEST } from '@types/oem';
import { getAllOEMIds } from '@selectors/oem';

const oemListProps = {
  label: "OEMs",
  header: { header: "Devices: Choose An OEM"},
  list: {
    text: "OEMs",
    to: "/devices",
    entityKey: "oems",
    placeholder: "There are no OEMs",
    type: FETCH_OEMS_REQUEST,
    selector: getAllOEMIds,
    url: "/oems"
  }
}

export default ({match:{url}}) => <ListPage {...oemListProps} />
