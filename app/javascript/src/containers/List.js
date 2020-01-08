import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';
import ListPlaceholder from '../components/ListPlaceholder';

export default function(props){
  const items = useSelector(props.selector);
  const dispatch = useDispatch();
  const fetchData = () => dispatch({type: props.type, payload: {url: props.url, id: props.id}});
  useEffect(() => {
    if(!items){
      fetchData()
    }
  },[])
  //if(error) return <FetchError error={error} retry={fetchData} />
  if(!items) return <FetchLoader text={props.text} />
  if(items.length === 0) return <ListPlaceholder text={props.placeholder} />
  return items.map(id =>
    <ListItem key={id} entityKey={props.entityKey} to={props.action ? `${props.to}/${id}/${props.action}` : `${props.to}/${id}`} id={id} />
  )
}
