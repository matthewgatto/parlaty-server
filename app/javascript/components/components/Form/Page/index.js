import React from 'react';
import { Link } from 'react-router-dom'
import PageLayout from '@components/PageLayout';
import Context from '../Context';
import FormError from '@containers/FormError';
import Buttons from '../Buttons';
import {Input} from '@components/Inputs';
import styles from './index.module.css';

export default ({layout, form, cancel, children, inputs}) => (
  <PageLayout {...layout}>
    <Context className={styles.container} submitOnEnter {...form} >
      {({handleSubmit, formKey}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input as="input" key={input.name} {...input} formKey={formKey} />)}
        {children && children}
        <Buttons cancel={cancel} formKey={formKey} handleSubmit={handleSubmit} />
        </>)}
    </Context>
  </PageLayout>
)
