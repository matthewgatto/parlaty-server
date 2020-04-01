import React from 'react';
import PageLayout from '@components/PageLayout';
import UserUpdateForm from '@containers/UserUpdateForm';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import DeleteUserConfirmationModal from '../DeleteConfirmationModal'

export default ({match}) => (<>
  <PageLayout
    header="Update User"
    back={{
      to: "/users",
      label: "Users"
    }}
    buttons={<ModalTrigger modal="delete_user_confirmation"><SubmitButton primary label="Delete User" /></ModalTrigger>}
  >
    <UserUpdateForm id={match.params.id} />
  </PageLayout>
  <DeleteUserConfirmationModal id={match.params.id} />
</>)
