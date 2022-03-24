import React from 'react';
import {useSelector} from 'react-redux'
import PageLayout from '@components/PageLayout';
import List from '@components/List';
import Label from '@components/List/Label';
import {getAllIds} from '@selectors/oem_business';

export default ({match:{url}}) => {
  const oem_businesses = useSelector(getAllIds);
  return(
    <PageLayout
      header="Home"
    >
      <Label>Subscription</Label>
      <Label>Sites</Label>
      <List items={oem_businesses} to="/sites" placeholder="You have no sites" text="sites" entityKey="oem_businesses"  />
    </PageLayout>
  )
}
