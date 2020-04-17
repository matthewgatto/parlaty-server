import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import { getUser } from '@selectors/auth';
import {FETCH_SELF_REQUEST} from '@types/auth';

const UserCategories = (props) => {
  const dispatch = useDispatch();
  const {id,businesses} = useSelector(getUser);
  useEffect(() => {
    if(!businesses){
      dispatch({type: FETCH_SELF_REQUEST, payload: {url: `/users/${id}`, id}})
    }
  },[id,businesses,dispatch])
  return <List items={businesses} entityKey="businesses" to="/businesses" placeholder="You have no categories" text="categories" />
}
export default () => (
  <PageLayout
    header="Choose A Category"
  >
  <Label>Categories</Label>
  <UserCategories />
  </PageLayout>
)
