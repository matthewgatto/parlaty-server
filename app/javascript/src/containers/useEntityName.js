import React from 'react';
import {useSelector} from 'react-redux';

export default (entity,id) => {
  console.log("entity", entity);
  console.log("id", id);
  const name = useSelector(state => state[entity] && state[entity].byId[id] && state[entity].byId[id].name)
  return name;
}
