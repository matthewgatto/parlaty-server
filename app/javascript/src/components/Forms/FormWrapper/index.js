import React from 'react';
import { Formik, Form } from 'formik';

export default function(props){
  return(
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        {...props.formik}
      >
        <Form {...props.form}>
          {props.children}
        </Form>
      </Formik>
  )
}
