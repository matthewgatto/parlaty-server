import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../PageLayout';
import Form from '../../Form/NewContext';
import { Input } from '../../Inputs';
import FormError from '../../../containers/FormError';
import FormPolygons from '../../SVG/FormPolygons';
import Buttons from '../../Form/Buttons';
import ActionFormList from '../../../containers/ActionFormList';
import AddActionFormButton from '../../../containers/AddActionFormButton';
import SubmitButton from '../../../containers/SubmitButton';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({device_id, header,...props}) => (
  <PageLayout
    header={header}
    back={{
      to: "/devices",
      label: "Devices"
    }}
  >
    <Form {...props} entity="device" className={styles.content}>
      {({handleSubmit, formKey}) => (<>
          <div>
          <FormError formKey={formKey} large top />
          <div className={styles.margin}>
            <Input as="input" name="name" type="text" label="Name" formKey={formKey} />
          </div>
          <AddActionFormButton formKey={formKey} />
          <FormPolygons />
          </div>
          <div>
            <div className={styles.columnTitle}>Device Actions</div>
            <ActionFormList formKey={formKey} device_id={device_id} initialActions={props.initialValues && props.initialValues.actions} />
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" className={styles.submit} />
          </div>
        </>)}
    </Form>
  </PageLayout>
)
