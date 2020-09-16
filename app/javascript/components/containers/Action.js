import React from 'react';
import { useSelector } from 'react-redux';
import Action from '@components/Action/Item';

export default ({id, ...props}) => {
  const action = useSelector(state => state.actions.byId[id]);
  let parent_id = action.parent_id;
  const parent = parent_id ? useSelector(state => state.actions.byId[parent_id]) : undefined;
  return <Action {...props} action={action} parent={parent}/>
}
