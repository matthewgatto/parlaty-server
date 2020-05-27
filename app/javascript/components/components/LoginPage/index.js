import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import FormError from '@containers/FormError';
import FormContext from '@components/Form/Context';
import {Input} from '@components/Inputs';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@containers/SubmitButton'
import { loginSchema } from '@utils/validation';
import { CREATE_AUTH_REQUEST } from '@types/auth';
import styles from './index.module.css';

const inputs = [{
  type: "email",
  name: "email",
  placeholder: "Email/Username",
  required: true
}, {
  type: "password",
  name: "password",
  placeholder: "Password",
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
    <div className={styles.header}>Parlaty<sup className={styles.tm}>&#8482;</sup> Login</div>
    <div className={styles.subheader}>Or <Link to="/#" className={styles.underline}>Create Account</Link></div>
    <FormContext
      entity="auth"
      url="/login"
      type={CREATE_AUTH_REQUEST}
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={loginSchema}
      className={styles.form}
      id={uuid()}
      submitOnEnter
    >
      {({handleSubmit, formKey}) => (<>
        <div className={styles.error}>
          <FormError formKey={formKey} />
        </div>
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} as="input" />)}
        <SubmitButton formKey={formKey} onClick={handleSubmit} label="Login" secondary />
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
