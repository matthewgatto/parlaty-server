import React from 'react';
import ListItem from '@components/List/Item';
import useEntityName from '@containers/useEntityName';

export default (props) => {
  const name = useEntityName(props.entityKey, props.id);
  return <ListItem name={name} {...props} />
}
