import React from 'react';
import {useSelector} from 'react-redux';
import List from '@components/List';
import {getOEMBusinesses} from '@selectors/oem';

export default ({client}) => {
  const categories = useSelector(getOEMBusinesses(client))
  return <List items={categories} entityKey="businesses" to="/businesses" placeholder="You have no categories" text="categories" />
}
