import React from 'react';
import { useSelector } from 'react-redux';
import { Controller } from "react-hook-form";
import SelectComponent, {withSelectContainer} from '../components/Inputs/Select';
import DeviceActionList from '../components/Device/ActionList';
import withLabel from '../components/Inputs/withLabel';
import {makeName} from '../utils'

const DeviceSelect = withLabel(withSelectContainer(SelectComponent));

const DeviceSelectContainer = ({value, ...props}) => {
  const devices = useSelector(({devices}) => devices.byId);
  const device = devices[value]
  return(<>
    <DeviceSelect value={value} {...props} />
    <DeviceActionList actions={device.actions} />
  </>)
}

export default ({defaultValue, root,...props}) => (
  <Controller defaultValue={defaultValue || 1} name={makeName(root, props.name)} as={<DeviceSelectContainer {...props} />} />
)
