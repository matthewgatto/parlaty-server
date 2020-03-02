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

class DeviceSelectClass extends React.PureComponent {
  componentDidMount(){
    if(this.props.value){
      this.selectFirstActionWithParameterValues()
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.value !== this.props.value){
      this.selectFirstActionWithParameterValues()
    }
  }
  selectFirstActionWithParameterValues = () => {
    var action;
    if(this.props.actions && this.props.actions.length > 0){
      for (var i = 0; i < this.props.actions.length; i++) {
        if(this.props.actions[i].parameter_name && this.props.actions[i].parameter_value_8_pack){
          action = this.props.actions[i];
          break;
        }
      }
    }
    this.props.setSelectedAction(action);
  }
  render(){
    const {value,actions,selectedAction,setSelectedAction,root, ...props} = this.props;
    return(<>
      <DeviceSelect value={value} {...props} placeholder="Choose A Device" />
      <ActionList actions={actions} root={root} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
      {/*<StatelessParameters action={selectedAction} value={value} root={root} />*/}
    </>)
  }
}
const DeviceSelectContainer = (props) => {
  const [selectedAction, setSelectedAction] = useState()
  const actions = useSelector(({devices,actions}) => (props.value && devices.byId[props.value]) ? devices.byId[props.value].actions.map(actionId => actions.byId[actionId]) : undefined)
  return <DeviceSelectClass {...props} actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
}

export default ({name, procedure_id, ...props}) => {
  const {devices} = useSelector(getProcedureById(procedure_id))
  const deviceArray = useSelector((state) => (devices && devices.length > 0) ? devices.map(deviceId => state.devices.byId[deviceId]) : null)
  return(
    <Controller {...props} options={(deviceArray && deviceArray.length > 0) ? deviceArray.map(({id, name}) => ({value: id, label: name})) : undefined} name={makeName(props.root, name)} as={DeviceSelectContainer} />
  )
}
