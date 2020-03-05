import React from 'react';
import { Link } from 'react-router-dom';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@components/SubmitButton';
import DeviceForm from '@components/Device/Forms/Modal';
import DeviceUpdateForm from '@components/Device/Forms/UpdateModal';
import withModal from '@containers/withModal';
import DeviceManager from '../DeviceManager';
import DeviceCopyList from '../DeviceCopyList'
import styles from './index.module.css';

const DeviceCreateModal = withModal(DeviceForm, "create_device");
const ProcedureDeviceModal = withModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = withModal(DeviceUpdateForm, "update_device");

export default ({match:{params:{oem_id,business_id,id}},location:{pathname}}) => (<>
  <div className={styles.container}>
    <div className={styles.topPolygonContainer}>
      <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
      <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
    <div className={styles.header}>Add Procedure Devices</div>
    <div className={styles.subheader}>Add any devices that will be used throughout the procedure (you may always add devices later)</div>
    <div className={styles.form}>
      <DeviceManager procedure_id={id} />
      <Link to={`${pathname.slice(0, -11)}add-steps`} className={styles.link}><SubmitButton label="Continue" secondary /></Link>
    </div>
    <div className={styles.bottomPolygonContainer}>
      <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
      <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
  </div>
  <DeviceCreateModal procedure_id={id} />
  <ProcedureDeviceModal business_id={business_id} />
  <DeviceUpdateModal />
</>)
