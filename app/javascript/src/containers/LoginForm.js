import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { Input } from '../components/Inputs';
import SubmitButton from './SubmitButton';
import { handleLoginSubmit } from '../redux/reducers/user';
import { loginSchema } from '../utils/validation';


function LoginFormContainer(props){
  return(
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={props.handleLoginSubmit}
    >
      <Form>
        <Input type="email" name="email" placeholder="Email/Username" />
        <Input type="password" name="password" placeholder="Password" />
        <SubmitButton label="Login" entityKey="login" />
      </Form>
    </Formik>
  )
}


export default connect(
  null,
  { handleLoginSubmit }
)(LoginFormContainer);
