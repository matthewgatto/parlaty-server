import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Controller, useFormContext} from "react-hook-form";
import SelectComponent, {withSelectContainer} from '@components/Inputs/Select';
import ActionList from '@components/Action/List';
import withField from '@components/Inputs/withField';
import {makeName} from '@utils'
import {getProcedureById} from '@selectors/procedure';
import {getDeviceById, getDeviceActions} from '@selectors/device';

const DeviceSelect = withField(withSelectContainer(SelectComponent));

const DeviceSelectContainer = ({root, formKey, device_id, ...props}) => {
  const [id, setId] = useState(device_id);
  const { setValue } = useFormContext();
  const defChange = e => {
    setId(e.target.value);
    setValue(props.name, e.target.value);
  };
  useEffect(() => {
    setId(device_id);
  }, [device_id])
  const actions = useSelector(getDeviceActions(id));
  return(<>
    <DeviceSelect {...props} value={id} onChange={e => props.onChange && props.onChange(e) || defChange(e)} placeholder="Choose A Device" />
    <ActionList {...props} formKey={formKey} actions={actions} root={root} />
  </>)
};

export default ({name, procedure_id, onChange, ...props}) => {
  const {devices} = useSelector(getProcedureById(procedure_id));
  const deviceArray = useSelector((state) => (devices && devices.length > 0) ? devices.map(deviceId => state.devices.byId[deviceId]) : null);
  let selectedDevice = useSelector(getDeviceById(props.device_id));
  let parentDeviceId = selectedDevice && selectedDevice.parent_id;
  const devicesWithoutChildren = deviceArray && deviceArray.filter(device => (
    (device.parent_id === null && parseInt(parentDeviceId) !== parseInt(device.id)) ||
    parseInt(device.id) === parseInt(props.device_id))
  );
  return(
    <Controller
      {...props}
      onChange={onChange}
      options={(devicesWithoutChildren && devicesWithoutChildren.length > 0)
        ? devicesWithoutChildren.map(({id, machine_tag, name}) => ({value: id, label: `${machine_tag ? `${machine_tag} - ` : ""}${name}`}))
        : undefined}
      name={makeName(props.root, name)} as={DeviceSelectContainer} />
  )
}
