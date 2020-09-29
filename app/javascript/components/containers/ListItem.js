import React from 'react';
import ListItem from '@components/List/Item';
import useEntityName from '@containers/useEntityName';
import useCommentsInfo from '@containers/useCommentsInfo';

export default (props) => {
  const name = useEntityName(props.entityKey, props.id);
  const hasComments = props.entityKey === "procedures" ?
    useCommentsInfo(props.entityKey, props.id)
     : null
  return <ListItem name={name} hasComments={hasComments} {...props} />
}
