import React from 'react';
import uuid from 'uuid/v4'
import FormPage from '@components/Form/Page';
import {Select} from '@components/Inputs';
import { inviteSchema } from '@utils/validation';
import { CREATE_OEM_REQUEST } from '@types/oem';
import { CREATE_USER_REQUEST } from '@types/auth';
import styles from './index.module.css';

const inputs = [{
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}, {
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export const OEMInvitationForm = ({match:{params:{roleable}}}) => (
  <FormPage
    header="Send User Invitation"
    form={{
      entity: "invite_oem",
      url: "/users",
      type: CREATE_OEM_REQUEST,
      initialValues: {email: '', name: ''},
      extraValues: {roleable},
      validationSchema: inviteSchema,
      id: uuid()
    }}
    inputs={inputs}
  />
)

const ROLE_OPTIONS = [{value: "operator", label: "Operator"}, {value: "parlatyadmin", label: "Parlaty Admin"}, {value: "oem", label: "OEM"}]
export const UserInvitationForm = () => (
  <FormPage
    header="Send User Invitation"
    form={{
      entity: "invite_user",
      url: "/users",
      type: CREATE_USER_REQUEST,
      initialValues: {email: '', name: '', roleable: "operator"},
      validationSchema: inviteSchema,
      id: uuid()
    }}
    inputs={inputs}
  >
    <Select options={ROLE_OPTIONS} label="Role*" name="roleable" defaultValue="operator" className={styles.underline} />
  </FormPage>
)
