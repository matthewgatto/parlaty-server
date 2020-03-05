import React from 'react';
import FormContext from '@components/Form/Context';
import { Input } from '@components/Inputs';
import FormPolygons from '@components/SVG/FormPolygons';
import AddStepFormButton from '@containers/AddStepFormButton';
import StepList from '@containers/StepList';
import FormError from '@containers/FormError';
import ProcedureSubmitButton from '@containers/SubmitButton';
import SubmitButton from '@components/SubmitButton';
import DeviceForm from '@components/Device/Forms/Modal';
import DeviceUpdateForm from '@components/Device/Forms/UpdateModal';
import withModal from '@containers/withModal';
import ModalTrigger from '@containers/ModalTrigger';
import DeviceCopyList from '../DeviceCopyList'
import DeviceManagerModal from '../DeviceManagerModal'
import { procedureSchema } from '@utils/validation';
import styles from './index.module.css';

const DeviceCreateModal = withModal(DeviceForm, "create_device");
const ProcedureDeviceModal = withModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = withModal(DeviceUpdateForm, "update_device");

export default (props) => (<>
  <FormContext
    {...props}
    entity="procedure"
    validationSchema={procedureSchema}
    className={styles.content}
  >
    {({handleSubmit, formKey}) => (<>
      <div>
        <div className={styles.margin}>
          <Input as="input" name="name" type="text" label="Procedure Name" formKey={formKey} />
          <Input as="textarea" label="Description" name="description" rows="6" formKey={formKey} />
        </div>
        <AddStepFormButton formKey={formKey} />
        <ModalTrigger modal="manage_devices" className={styles.manageDeviceButton}><SubmitButton label="Manage Devices" /></ModalTrigger>
        <FormPolygons />
      </div>
      <div>
        <div className={styles.columnTitle}>Procedure Steps</div>
        <StepList procedure_id={props.procedure_id} formKey={formKey} initialStepIds={props.initialValues.steps} />
        <ProcedureSubmitButton formKey={formKey} onClick={handleSubmit} label="Save Procedure" className={styles.submit} />
        <FormError formKey={formKey} large className={styles.error} />
      </div>
    </>)}
  </FormContext>
  <DeviceManagerModal procedure_id={props.procedure_id} />
  <DeviceCreateModal procedure_id={props.procedure_id} />
  <ProcedureDeviceModal business_id={props.business_id} />
  <DeviceUpdateModal />
</>)
