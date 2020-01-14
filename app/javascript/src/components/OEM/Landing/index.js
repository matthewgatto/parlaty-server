import React from 'react';
import {useSelector} from 'react-redux'
import PageLayout from '../../PageLayout';
import List from '../../List';

export default ({match: {params}}) => {
  const businesses = useSelector(({businesses}) => businesses.allIds);
  return(
    <PageLayout
      header="Home"
      link={{text: "Add Business", to: "/business/create"}}
    >
      <div className='list_label'>Businesses</div>
      <List items={businesses} to="/business" placeholder="You have no businesses" text="Businesses" entityKey="businesses"  />
    </PageLayout>
  )
}
