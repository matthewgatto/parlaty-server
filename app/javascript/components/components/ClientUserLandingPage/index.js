import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import ClientCategories from '@containers/ClientCategories'
import withUserInfo from '@containers/withUserInfo'

export default withUserInfo(({user}) => (
  <PageLayout
    header="Choose A Category"
    link={user.roleable === "ClientAdmin" ? {to: "/businesses/create", text: "Add Category"} : undefined}
  >
    <Label>Categories</Label>
    <ClientCategories />
  </PageLayout>
))
