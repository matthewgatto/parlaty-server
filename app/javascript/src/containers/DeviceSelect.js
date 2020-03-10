import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from "react-hook-form";
import SelectComponent, {withSelectContainer} from '@components/Inputs/Select';
import ActionList from '@components/Action/List';
import {StatelessParameters} from '@components/Inputs/Parameter';
import withField from '@components/Inputs/withField';
import {makeName} from '@utils'
import {getProcedureById} from '@selectors/procedure';

const DeviceSelect = withField(withSelectContainer(SelectComponent));

const DeviceSelectContainer = ({root, value, defaultDevice, formKey, ...props}) => {
  const actions = useSelector(({devices,actions}) => (value && devices.byId[value]) ? devices.byId[value].actions.map(actionId => actions.byId[actionId]) : undefined)
  return(<>
    <DeviceSelect value={value} {...props} placeholder="Choose A Device" />
    <ActionList formKey={formKey} actions={actions} root={root} defaultActions={(defaultDevice && defaultDevice.id == value) ? defaultDevice.actions : undefined} />
  </>)
}

export default ({name, procedure_id, ...props}) => {
  const {devices} = useSelector(getProcedureById(procedure_id))
  const deviceArray = useSelector((state) => (devices && devices.length > 0) ? devices.map(deviceId => state.devices.byId[deviceId]) : null)
  return(
    <Controller {...props} defaultValue={props.defaultDevice && props.defaultDevice.id} options={(deviceArray && deviceArray.length > 0) ? deviceArray.map(({id, name}) => ({value: id, label: name})) : undefined} name={makeName(props.root, name)} as={DeviceSelectContainer} />
  )
}
