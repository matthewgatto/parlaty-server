import React from 'react';
import {useSelector} from 'react-redux';

export default ({id, entityKey}) => {
  return useSelector(state => state[entityKey].byId[id] ? state[entityKey].byId[id].name : null);
}
