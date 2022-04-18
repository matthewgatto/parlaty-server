import React from 'react';
import PageLayout from '@components/PageLayout';
import Label from '@components/List/Label';
import List from '@components/List';
import withUserInfo from '@containers/withUserInfo'
import useOemInfo from '@containers/useOemInfo';
import ClientOemBusinesses from '@containers/ClientOemBusinesses'
import Content from '@components/Oem/Content';

export default withUserInfo(({user}) => {
  let oem = user.client ? user.client : null;
  let oem_id = oem ? oem.id : user.oem;
  console.log("USER:" + user);
  return (
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
      {user.roleable === "ClientAdmin" ? <Content oem={oem} /> : null}
      <Label>Sites</Label>
      <ClientOemBusinesses />
    </PageLayout>
  )
})
