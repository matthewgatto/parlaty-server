import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import useUserInfo from '@containers/useUserInfo'

const UserCategories = (props) => {
  const user = useUserInfo();
  return <List items={user && user.businesses} entityKey="businesses" to="/businesses" placeholder="You have no categories" text="categories" />
}

export default () => (
  <PageLayout
    header="Choose A Category"
  >
  <Label>Categories</Label>
  <UserCategories />
  </PageLayout>
)
