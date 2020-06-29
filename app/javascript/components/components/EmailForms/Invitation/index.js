import React from 'react';
import uuid from 'uuid/v4'
import PageLayout from '@components/PageLayout';
import FormContext from '@components/Form/Context';
import FormError from '@containers/FormError';
import { Input, Select } from '@components/Inputs';
import ProcedureSubmitButton from '@containers/SubmitButton';
import FormPolygons from '@components/SVG/FormPolygons';
import UserRoleFields from '@components/UserRoleFields';
import { inviteSchema } from '@utils/validation';
import { CREATE_USER_REQUEST } from '@types/user';
import styles from './index.module.css';

export default ({options,role}) => {
  const id = uuid();
  return(
    <PageLayout
      header="Send User Invitation"
      back={{
        to: "/users",
        label: "Users"
      }}
    >
    <FormContext
      entity="invite_user"
      url="/users"
      type={CREATE_USER_REQUEST}
      initialValues={{}}
      validationSchema={inviteSchema}
      className={styles.content}
      id={id}
    >
      {({handleSubmit, formKey}) => (<>
        <div>
          <div className={styles.margin}>
            <Input as="input" name="name" type="text" label="Name*" formKey={formKey} />
            <Input as="input" name="email" type="text" label="Email*" formKey={formKey} />
            <ProcedureSubmitButton formKey={formKey} onClick={handleSubmit} label="Send Invite" className={styles.submit} />
          </div>
          <FormError formKey={formKey} large className={styles.error} />
          <FormPolygons />
        </div>
        <div>
          <div className={styles.columnTitle}>Role Information</div>
          <div className={styles.rolePanel}>
          <Select defaultValue={options[0].value} options={options} label="Role*" name="roleable" formKey={formKey} placeholder="Choose a role"  />

          <UserRoleFields formKey={formKey} role={role} />
          </div>
        </div>
      </>)}
    </FormContext>
    </PageLayout>
  )
}
