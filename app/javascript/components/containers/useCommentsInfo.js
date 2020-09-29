import React from 'react';
import {useSelector} from 'react-redux';

export default (entity, id) => {
  const hasNewComments = useSelector(state => state[entity] && state[entity].byId[id] && state[entity].byId[id].has_new_comments)
  return hasNewComments;
}
