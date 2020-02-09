import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from "react-hook-form";
import SelectComponent, {withSelectContainer} from '@components/Inputs/Select';
import ActionList from '@components/Action/List';
import {StatelessParameters} from '@components/Inputs/Parameter';
import withField from '@components/Inputs/withField';
import {makeName} from '@utils'
import {getDeviceMap} from '@selectors/device';

const DeviceSelect = withField(withSelectContainer(SelectComponent));

class DeviceSelectClass extends React.PureComponent {
  componentDidMount(){
    if(this.props.value){
      this.selectFirstActionWithParameterValues()
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.value && prevProps.value !== this.props.value){
      this.selectFirstActionWithParameterValues()
    }
  }
  selectFirstActionWithParameterValues = () => {
    var action;
    for (var i = 0; i < this.props.actions.length; i++) {
      if(this.props.actions[i].parameter_name && this.props.actions[i].parameter_value_8_pack){
        action = this.props.actions[i];
        break;
      }
    }
    this.props.setSelectedAction(action);
  }
  render(){
    const {value,actions,selectedAction,setSelectedAction,...props} = this.props;
    return(<>
      <DeviceSelect value={value} {...props} placeholder="Choose A Device" />
      <ActionList actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
      <StatelessParameters action={selectedAction} value={value} />
    </>)
  }
}
const DeviceSelectContainer = (props) => {
  const [selectedAction, setSelectedAction] = useState()
  const actions = useSelector(({devices,actions}) => (props.value && devices.byId[props.value]) ? devices.byId[props.value].actions.map(actionId => actions.byId[actionId]) : undefined)
  return <DeviceSelectClass {...props} actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
}

export default ({defaultValue, root,...props}) => (
  <Controller defaultValue={defaultValue || 1} name={makeName(root, props.name)} as={<DeviceSelectContainer {...props} />} />
)
