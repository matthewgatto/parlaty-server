import React from 'react';
import uuid from 'uuid/v4';
import ActionFormList from '@containers/ActionFormList';
import AddActionFormButton from '@containers/AddActionFormButton';
import SubmitButton from '@containers/SubmitButton';
import FormError from '@containers/FormError';
import Bar from '@components/Bar/Large';
import Form from '@components/Form/NewContext';
import { Input } from '@components/Inputs';
import Buttons from '@components/Form/Buttons';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({procedure_id, ...props}) => {
  console.log("RENDERING DEVICE FORM");
  return(
    <div className={styles.modalContainer}>
      <Bar title="Procedure Device" />
      <Form
        entity="add_device"
        url={`/procedures/${procedure_id}`}
        type="CREATE_PROCEDURE_DEVICE_REQUEST"
        initialValues={{name: ''}}
        extraValues={{procedure_id}}
        id={uuid()}
        className={styles.content}
      >
        {({handleSubmit, formKey}) => (<>
            <div>
            <FormError formKey={formKey} large top />
            <div className={styles.margin}>
              <Input as="input" name="name" type="text" label="Name" formKey={formKey} />
            </div>
            </div>
            <div>
              <div className={styles.columnTitle}>Device Actions</div>
              <ActionFormList formKey={formKey} initialActions={props.initialValues && props.initialValues.actions} />
              <AddActionFormButton formKey={formKey} />
              <SubmitButton formKey={formKey} onClick={handleSubmit} label="Save" className={styles.submit} />
            </div>
          </>)}
      </Form>
    </div>
  )
}
