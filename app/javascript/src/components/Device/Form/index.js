import React from 'react';
import { Link } from 'react-router-dom';
import ActionFormList from '@containers/ActionFormList';
import AddActionFormButton from '@containers/AddActionFormButton';
import SubmitButton from '@containers/SubmitButton';
import FormError from '@containers/FormError';
import Modal from '@containers/Modal';
import PageLayout from '@components/PageLayout';
import Form from '@components/Form/NewContext';
import { Input } from '@components/Inputs';
import FormPolygons from '@components/SVG/FormPolygons';
import Buttons from '@components/Form/Buttons';
import styles from './index.module.css';
/*
import LargeBar from '@components/Bar/Large';
import SmallBar from '@components/Bar/Small';
import AddFormButton from '@components/Form/Nested/AddFormButton';
import ModalOpenTrigger from '@containers/ModalOpenTrigger';
*/
const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]
//const PROCEDURES = ["Procedure One", "Procedure Two", "Procedure Three", "Procedure Four", "Procedure Five", "Procedure Six", "Procedure Seven", "Procedure Eight", "Procedure Nine", "Procedure Ten"]
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
          {/*
            <ModalOpenTrigger>
              <AddFormButton text="Add Device To Procedure" />
            </ModalOpenTrigger>
            */}
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
  {/*
    <Modal>
      <div className={styles.modalContent}>
      <LargeBar title="Add Device To Procedure" className={styles.modalHeader} />
      <div>
        {PROCEDURES.map(procedure => <SmallBar text={procedure} key={procedure} />)}
      </div>
      </div>
    </Modal>
    */}

</>)
