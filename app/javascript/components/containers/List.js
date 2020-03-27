import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@components/List';

export default function(props){
  const items = useSelector(props.selector);
  const dispatch = useDispatch();
  const fetchData = () => dispatch({type: props.type, payload: {url: props.url, id: props.id}});
  useEffect(() => {
    console.log("useEffect items", items);
    if(!items){
      fetchData()
    }
  },[])
  console.log("items", items);
  return <List /*error={false}*/ fetchData={fetchData} items={items} action={props.action} entityKey={props.entityKey} to={props.to} text={props.text} placeholder={props.placeholder} />
}
