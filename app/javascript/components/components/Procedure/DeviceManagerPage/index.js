import React from 'react';
import Polygon from '@components/SVG/PolygonH';
import DeviceForm from '@components/Device/Create';
import DeviceUpdateForm from '@components/Device/Edit';
import DeleteDeviceConfirmationModal from '@components/Device/DeleteConfirmationModal';
import activeModal from '@containers/activeModal';
import ModalOverlay from '@components/Modal/Overlay';
import useEntityName from '@containers/useEntityName';
import DeviceCopyList from '../DeviceCopyList'
import DeviceManager from '../DeviceManager';
import styles from './index.module.css';

const DeviceCreateModal = activeModal(DeviceForm, "create_device");
const ProcedureDeviceModal = activeModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = activeModal(DeviceUpdateForm, "update_device");

export default ({header, subheader, formComponents, procedure_id, oem_business_id, top}) => {
  const name = useEntityName("procedures", procedure_id);
  return(<>
    <div className={styles.container}>
      {top}
      <div className={styles.topPolygonContainer}>
        <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
        <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
      {header && <div className={styles.header}>{`${header} ${name ? name : "Procedure"} Devices`}</div>}
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
    <ModalOverlay>
      <DeviceCreateModal name={name} procedure_id={procedure_id} />
      <ProcedureDeviceModal oem_business_id={oem_business_id} />
      <DeviceUpdateModal name={name} />
      <DeleteDeviceConfirmationModal procedure_id={procedure_id} />
    </ModalOverlay>
  </>)
}
