import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {Controller, useFormContext} from "react-hook-form";
import SelectComponent, {withSelectContainer} from '@components/Inputs/Select';
import ActionList from '@components/Action/List';
import withField from '@components/Inputs/withField';
import {makeName} from '@utils'
import {getProcedureById} from '@selectors/procedure';

const DeviceSelect = withField(withSelectContainer(SelectComponent));

const DeviceSelectContainer = ({root, formKey, device_id, ...props}) => {
  const [id, setId] = useState(device_id);
  const { setValue } = useFormContext();
  const defChange = e => {
    setId(e.target.value);
    setValue(props.name, e.target.value);
  };
  const actions = useSelector(state => id && state.devices.byId[id] && state.devices.byId[id].actions);
  return(<>
    <DeviceSelect {...props} value={id} onChange={e => props.onChange && props.onChange(e) || defChange(e)}  placeholder="Choose A Device" />
    <ActionList {...props} formKey={formKey} actions={actions} root={root} />
  </>)
};

export default ({name, procedure_id, onChange, ...props}) => {
  const {devices} = useSelector(getProcedureById(procedure_id));
  const deviceArray = useSelector((state) => (devices && devices.length > 0) ? devices.map(deviceId => state.devices.byId[deviceId]) : null);
  const devicesWithoutChildren = deviceArray && deviceArray.filter(device => device.parent_id === null || parseInt(device.id) === parseInt(props.defaultValue));
  return(
    <Controller
      {...props}
      onChange={onChange}
      options={(devicesWithoutChildren && devicesWithoutChildren.length > 0)
        ? devicesWithoutChildren.map(({id, name}) => ({value: id, label: name}))
        : undefined}
      name={makeName(props.root, name)} as={DeviceSelectContainer} />
  )
}
