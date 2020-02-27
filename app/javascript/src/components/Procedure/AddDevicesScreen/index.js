import React from 'react';
import Polygon from '@components/SVG/PolygonH';
import SubmitButton from '@components/SubmitButton';
import DeviceForm from '@components/Device/Forms/Modal';
import ModalSwitch from '@containers/ModalSwitch';
import ModalTrigger from '@containers/ModalTrigger';
import ProcedureDevices from '../Devices';
import ProcedureDeviceModal from '../DeviceCopyList'
import styles from './index.module.css';

export default ({match:{params:{oem_id,business_id,id}}}) => (<>
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
      <ProcedureDevices procedure_id={id} />
      <div className={styles.buttonRow}>
        <ModalTrigger modal="procedure_device_list" className={styles.button}>Copy A Device</ModalTrigger>
        <div>- or -</div>
        <ModalTrigger modal="create_device" className={styles.button}>Create A New Device</ModalTrigger>
      </div>
      <SubmitButton label="Continue" secondary />
    </div>
    <div className={styles.bottomPolygonContainer}>
      <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
      <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
      <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
      <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
    </div>
  </div>
  <ModalSwitch>
    <DeviceForm modal="create_device" procedure_id={id} />
    <ProcedureDeviceModal modal="procedure_device_list" business_id={business_id} />
  </ModalSwitch>
</>)
