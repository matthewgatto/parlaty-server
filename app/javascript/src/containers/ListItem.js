import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../components/List/Item';

export default (props) => {
  // get name of entity
  const name = useSelector(state => state[props.entityKey].byId[props.id] ? state[props.entityKey].byId[props.id].name : undefined)
  return <ListItem name={name} {...props} />
}
