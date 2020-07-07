import React from 'react';
import ListPage from '../List/Page';
import { FETCH_OEMS_REQUEST } from '@types/oem';
import { getAllOEMIds } from '@selectors/oem';

const oemListProps = {
  label: "Clients",
  header: { header: "Choose A Client", link: { text: "Add Client", to: "/clients/create" }},
  list: {
    text: "Clients",
    to: "/oems",
    entityKey: "oems",
    placeholder: "There are no clients",
    type: FETCH_OEMS_REQUEST,
    selector: getAllOEMIds,
    url: "/oems"
  }
}

export default () => <ListPage {...oemListProps} />
