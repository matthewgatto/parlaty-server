import React from 'react';
import ActionFormList from '@containers/ActionFormList';
import AddActionFormButton from '@containers/AddActionFormButton';
import SubmitButton from '@containers/SubmitButton';
import FormError from '@containers/FormError';
import PageLayout from '@components/PageLayout';
import Form from '@components/Form/NewContext';
import { Input } from '@components/Inputs';
import FormPolygons from '@components/SVG/FormPolygons';
import Buttons from '@components/Form/Buttons';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({device_id, header,...props}) => (<>
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
          <FormPolygons />
          </div>
          <div>
            <div className={styles.columnTitle}>Device Actions</div>
            <ActionFormList formKey={formKey} device_id={device_id} initialActions={props.initialValues && props.initialValues.actions} />
            <AddActionFormButton formKey={formKey} />
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Save" className={styles.submit} />
          </div>
        </>)}
    </Form>
  </PageLayout>
</>)
