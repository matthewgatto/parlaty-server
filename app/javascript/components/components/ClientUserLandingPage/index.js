import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import useUserCategories from '@containers/useUserCategories'

const UserCategories = (props) => {
  const businesses = useUserCategories();
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
