import React from 'react';
import FormPage from '../../FormPage';
import {Select} from '../../Inputs';
import { inviteSchema } from '../../../utils/validation';
import { CREATE_OEM_REQUEST } from '../../../redux/types/oem';
import { CREATE_USER_REQUEST } from '../../../redux/types/auth';

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

export const OEMInvitationForm = ({match:{params:{roleable}},history:{goBack}}) => (
  <FormPage
    header="Send User Invitation"
    form={{
      entity: "oem",
      url: "/users",
      type: CREATE_OEM_REQUEST,
      initialValues: {email: '', name: ''},
      extraValues: {roleable},
      validationSchema: inviteSchema,
      id: new Date().getTime(),
      className: "form_container",
      submitOnEnter: true
    }}
    handleCancel={goback}
    inputs={inputs}
  />
)

const ROLE_OPTIONS = [{value: "operator", label: "Operator"}, {value: "parlatyadmin", label: "Parlaty Admin"}, {value: "oem", label: "OEM"}]
export const UserInvitationForm = ({history:{goBack}}) => (
  <FormPage
    header="Send User Invitation"
    form={{
      entity: "user",
      url: "/users",
      type: CREATE_USER_REQUEST,
      initialValues: {email: '', name: '', roleable: "operator"},
      validationSchema: inviteSchema,
      className: "form_container",
      id: new Date().getTime(),
      submitOnEnter: true
    }}
    handleCancel={goBack}
    inputs={inputs}
  >
    <Select options={ROLE_OPTIONS} label="Role*" name="roleable" defaultValue="operator" className="underline" />
  </FormPage>
)
