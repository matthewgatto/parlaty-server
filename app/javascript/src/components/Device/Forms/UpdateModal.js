import React from 'react';
import { useSelector } from 'react-redux';
import ActionFormList from '@containers/ActionFormList';
import AddActionFormButton from '@containers/AddActionFormButton';
import SubmitButton from '@containers/SubmitButton';
import FormError from '@containers/FormError';
import Bar from '@components/Bar/Large';
import Form from '@components/Form/NewContext';
import { Input } from '@components/Inputs';
import Buttons from '@components/Form/Buttons';
import { UPDATE_DEVICE_REQUEST } from '@types/device';
import {getDeviceById} from '@selectors/device';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({procedure_id, modalData}) => {
  const initialValues = useSelector(getDeviceById(modalData));
  return(
    <div className={styles.modalContainer}>
      <Bar title="Update Procedure Device" />
      <Form
        entity="update_device_modal"
        url={`/devices/${modalData}`}
        type={UPDATE_DEVICE_REQUEST}
        initialValues={initialValues}
        id={modalData}
        className={styles.content}
      >
        {({handleSubmit, formKey}) => (<>
            <div>
            <FormError formKey={formKey} large top />
            <div className={styles.margin}>
              <Input as="input" name="name" type="text" label="Name" formKey={formKey} defaultValue={initialValues && initialValues.name} />
            </div>
            </div>
            <div>
              <div className={styles.columnTitle}>Device Actions</div>
              <ActionFormList formKey={formKey} initialActions={initialValues && initialValues.actions} />
              <AddActionFormButton formKey={formKey} />
              <SubmitButton formKey={formKey} onClick={handleSubmit} label="Save" className={styles.submit} />
            </div>
          </>)}
      </Form>
    </div>
  )
}
