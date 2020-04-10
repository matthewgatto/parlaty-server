import React from 'react';
import { useSelector } from 'react-redux';
import Action from '@components/Action/Item';

export default ({id, ...props}) => {
  const action = useSelector(state => state.actions.byId[id]);
  return <Action {...props} action={action} />
}
