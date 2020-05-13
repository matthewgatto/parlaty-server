import React from 'react';
import {useSelector} from 'react-redux';
import List from '@components/List';
import {getAllIds} from '@selectors/business';

export default () => {
  const categories = useSelector(getAllIds)
  return <List items={categories} entityKey="businesses" to="/businesses" placeholder="You have no categories" text="categories" />
}
