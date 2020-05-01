import React from 'react';
import uuid from 'uuid/v4'
import PageLayout from '@components/PageLayout';
import UserInviteRolePanels from '@containers/UserInviteRolePanels';
import UserForm from '@components/User/Form';
import { CREATE_USER_REQUEST } from '@types/user';

export default ({role}) => {
  const id = uuid();
  return(
    <PageLayout
      header="Send User Invitation"
      back={{
        to: "/users",
        label: "Users"
      }}
    >
      <UserForm
        form={{
          entity: "invite_user",
          url: "/users",
          type: CREATE_USER_REQUEST,
          initialValues: {},
          id
        }}
        userRole={role}
        rolePanel={UserInviteRolePanels}
      />
    </PageLayout>
  )
}
