import React from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../PageLayout';
import HeaderBar from '../HeaderBar';
import Form, {Input, FormError, SubmitButton} from '../Forms/Login';
import BusinessList from '../Forms/BusinessList';
import { oemSchema } from '../Forms/validation';
import { UPDATE_OEM_REQUEST } from '../../redux/types';
import styles from './index.module.css';

const oemInputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}, {
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}]

const passwordInputs = [{
  type: "password",
  name: "password",
  label: "New Password*"
}]

export default ({history:{push},match:{params:{id}}}) => {
  const initialValues = useSelector(({oems:{byId:{[id]:oem}},businesses}) => oem ? ({id: oem.id, name: oem.name, email: oem.email, businesses: oem.businesses.map(d => ({name: businesses.byId[d].name, id: businesses.byId[d].id}))}) : undefined);
  return(
    <PageLayout header="Update OEM" back={{to: "/", label: "Back"}}>
      <Form
        entity="oem"
        url={`/oems/${id}`}
        type={UPDATE_OEM_REQUEST}
        initialValues={initialValues}
        validationSchema={oemSchema}
        submitOnEnter
      >
        {({handleSubmit, formKey, register, unregister}) => (<>
          <FormError formKey={formKey} large top />
          {oemInputs.map(input => <Input key={input.name} {...input} formKey={formKey} register={register} />)}
          <div className={styles.buttons}>
            <div className={styles.label}>
              Reset
            </div>
            <button className="button">
              Submit
            </button>
          </div>
          <HeaderBar title="Update Password" />
          {passwordInputs.map(input => <Input key={input.name} {...input} formKey={formKey} register={register} />)}
          <div className={styles.buttons}>
            <div className={styles.label}>
            </div>
            <button className="button">
              Submit
            </button>
          </div>
          <HeaderBar title="OEM Businesses" right={
            <button className="button">
              Add Business
            </button>
          }/>
          <BusinessList initialLength={(initialValues.businesses && initialValues.businesses.length > 0) ? initialValues.businesses.length : 1} formKey={formKey} register={register} unregister={unregister} />
          <div className={styles.buttons}>
            <div className={styles.label}>
              Reset
            </div>
            <button className="button">
              Submit
            </button>
          </div>
          </>)}
      </Form>
    </PageLayout>
  )
}
