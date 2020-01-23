import React from 'react';
import {useSelector} from 'react-redux'
import PageLayout from '../../PageLayout';
import List from '../../List';
import Label from '../../List/Label';
import {getAllIds} from '../../../redux/selectors/business';

export default ({match:{url}}) => {
  const businesses = useSelector(getAllIds);
  return(
    <PageLayout
      header="Home"
    >
      <Label>Businesses</Label>
      <List items={businesses} to="/businesses" placeholder="You have no businesses" text="Businesses" entityKey="businesses"  />
    </PageLayout>
  )
}
