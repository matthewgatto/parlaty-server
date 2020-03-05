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
import { CREATE_PROCEDURE_DEVICE_REQUEST } from '@types/device';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({procedure_id, modalData, ...props}) => {
  const id = uuid();
  return(
    <div className={styles.modalContainer}>
      <Bar title={modalData ? "Copy Procedure Device" : "Create Procedure Device"} />
      <Form
        entity="copy_device"
        url={`/procedures/${procedure_id}`}
        type={CREATE_PROCEDURE_DEVICE_REQUEST}
        initialValues={modalData || {name: ''}}
        extraValues={{procedure_id}}
        id={id}
        className={styles.content}
      >
        {({handleSubmit, formKey}) => (<>
            <div>
            <FormError formKey={formKey} large top />
            <div className={styles.margin}>
              <Input as="input" name="name" type="text" label="Name" formKey={formKey} defaultValue={modalData && modalData.name} />
            </div>
            </div>
            <div>
              <div className={styles.columnTitle}>Device Actions</div>
              <ActionFormList formKey={formKey} initialActions={modalData && modalData.actions} />
              <AddActionFormButton formKey={formKey} />
              <SubmitButton formKey={formKey} onClick={handleSubmit} label="Save" className={styles.submit} />
            </div>
          </>)}
      </Form>
    </div>
  )
}
