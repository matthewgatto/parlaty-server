import React from 'react';
import ListItem from '../../containers/ListItem';
import FetchLoader from './Loader';
import FetchError from './Error';
import ListPlaceholder from './Placeholder';

export default (props) => {
  //if(props.error) return <FetchError error={props.error} retry={props.fetchData} />
  if(!props.items) return <FetchLoader text={props.text} />
  if(props.items.length === 0) return <ListPlaceholder text={props.placeholder} />
  return props.items.map(id =>
    <ListItem key={id} entityKey={props.entityKey} to={props.action ? `${props.to}/${id}/${props.action}` : `${props.to}/${id}`} id={id} />
  )
}
