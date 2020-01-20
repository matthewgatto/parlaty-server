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
      link={{text: "Add Business", to: `${url}/create`}}
    >
      <Label>Businesses</Label>
      <List items={businesses} to={url} placeholder="You have no businesses" text="Businesses" entityKey="businesses"  />
    </PageLayout>
  )
}
