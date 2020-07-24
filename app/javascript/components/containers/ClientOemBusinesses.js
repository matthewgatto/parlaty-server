import React from 'react';
import {useSelector} from 'react-redux';
import List from '@components/List';
import {getAllIds} from '@selectors/oem_business';

export default () => {
  const oem_businesses = useSelector(getAllIds)
  return <List items={oem_businesses} entityKey="oem_businesses" to="/sites" placeholder="You have no sites" text="sites" />
}
