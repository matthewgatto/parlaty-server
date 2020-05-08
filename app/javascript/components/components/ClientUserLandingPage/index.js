import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import useUserInfo from '@containers/useUserInfo'


export default () => {
  const user = useUserInfo();
  return(
    <PageLayout
      header="Choose A Category"
      link={(user && user.roleable === "ClientAdmin") ? {to: "/businesses/create", text: "Add Category"} : undefined}
    >
    <Label>Categories</Label>
    <List items={user && user.businesses} entityKey="businesses" to="/businesses" placeholder="You have no categories" text="categories" />
    </PageLayout>
  )
}
