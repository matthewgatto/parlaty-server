import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import FormError from '@containers/FormError';
import FormContext from '@components/Form/Context';
import {Input} from '@components/Inputs';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@containers/SubmitButton'
import { registrationSchema } from '@utils/validation';
import { CREATE_REGISTRATION_REQUEST } from '@types/registration';
import styles from './index.module.css';

const inputs = [{
  type: "email",
  name: "email",
  placeholder: "Email*",
  required: true
}, {
    type: "text",
    name: "name",
    placeholder: "Name*",
    required: true
}, {
    type: "password",
    name: "password",
    placeholder: "Password*",
    required: true
}, {
    type: "password",
    name: "password_confirmation",
    placeholder: "Confirm Password*",
    required: true
},{
    type: "text",
    name: "oem_name",
    placeholder: "Company Name*",
    required: true
}]

export default () => (
  <div className={styles.container}>
    <div className={styles.topPolygonContainer}>
      <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
      <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
    <div className={styles.header}>Parlaty<sup className={styles.tm}>&#8482;</sup> Create Account</div>
    <FormContext
      entity="registration"
      url="/oems/register-client-admin"
      type={CREATE_REGISTRATION_REQUEST}
      initialValues={{
          email: '',
          name: '',
          password: '',
          password_confirmation: '',
          oem_name: ''
      }}
      validationSchema={registrationSchema}
      className={styles.form}
      id={uuid()}
      submitOnEnter
    >
      {({handleSubmit, formKey}) => (<>
        <div className={styles.error}>
          <FormError formKey={formKey} />
        </div>
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} as="input" />)}
        <SubmitButton formKey={formKey} onClick={handleSubmit} label="Create" secondary />
      </>)}
    </FormContext>
      <Link to="/forgot-password" className={styles.link}>I forgot my username/password</Link>
    <div className={styles.bottomPolygonContainer}>
      <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
      <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
  </div>
)
