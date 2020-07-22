import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import ClientOemBusinesses from '@containers/ClientOemBusinesses'
import withUserInfo from '@containers/withUserInfo'

export default withUserInfo(({user}) => (
  <PageLayout
    header="Choose A Site"
    link={
      user.roleable === "ClientAdmin" ?
        [
          {to: `/clients/${user.oem}/edit`, text: "Edit Client"},
          {to: "/sites/create", text: "Add Site"},
        ] :
          undefined
    }
  >
    <Label>Sites</Label>
    <ClientOemBusinesses />
  </PageLayout>
))
