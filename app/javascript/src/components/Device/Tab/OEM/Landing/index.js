import React from 'react';
import {useSelector} from 'react-redux'
import PageLayout from '@components/PageLayout';
import List from '@components/List';
import Label from '@components/List/Label';
import {getAllIds} from '@selectors/business';

export default ({match:{url}}) => {
  const businesses = useSelector(getAllIds);
  return(
    <PageLayout
      header="Devices: Choose A Category"
    >
      <Label>Businesses</Label>
      <List items={businesses} to={url} placeholder="You have no categories" text="Categories" entityKey="businesses"  />
    </PageLayout>
  )
}
