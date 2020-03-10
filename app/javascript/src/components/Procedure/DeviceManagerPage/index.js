import React from 'react';
import Polygon from '@components/SVG/PolygonH';
import DeviceForm from '@components/Device/Forms/Modal';
import DeviceUpdateForm from '@components/Device/Forms/UpdateModal';
import DeleteDeviceConfirmationModal from '@components/Device/DeleteConfirmationModal';
import withModal from '@containers/withModal';
import DeviceCopyList from '../DeviceCopyList'
import DeviceManager from '../DeviceManager';
import styles from './index.module.css';

const DeviceCreateModal = withModal(DeviceForm, "create_device");
const ProcedureDeviceModal = withModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = withModal(DeviceUpdateForm, "update_device");

export default ({header, subheader, formComponents, procedure_id, business_id, top}) => (<>
  <div className={styles.container}>
    {top}
    <div className={styles.topPolygonContainer}>
      <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
      <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
    {header && <div className={styles.header}>{header}</div>}
    {subheader && <div className={styles.subheader}>{subheader}</div>}
    <div className={styles.form}>
      <DeviceManager procedure_id={procedure_id} />
      {formComponents}
    </div>
    <div className={styles.bottomPolygonContainer}>
      <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
      <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
  </div>
  <DeviceCreateModal procedure_id={procedure_id} />
  <ProcedureDeviceModal business_id={business_id} />
  <DeviceUpdateModal />
  <DeleteDeviceConfirmationModal procedure_id={procedure_id} />
</>)
