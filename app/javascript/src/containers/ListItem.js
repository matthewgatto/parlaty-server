import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../components/List/Item';

export default (props) => (
  <ListItem name={useSelector(state => state[props.entityKey].byId[props.id] ? state[props.entityKey].byId[props.id].name : undefined)} {...props} />
)
