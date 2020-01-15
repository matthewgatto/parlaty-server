import React,{useCallback} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderDeviceAction,removeDeviceAction,addDeviceAction} from '../redux/actions/device';
import {getActionFields} from '../redux/selectors/device';
import withDND from '../components/withDND';
import Placeholder from '../components/Placeholder';
import Bar from '../components/Bar/Large';
import ActionInput from '../components/Device/ActionField';

const DNDActionFields = withDND(({initialActions, handleDeleteAction, formKey}) => {
  const actionForms = useSelector(getActionFields);
  if(actionForms.length > 0){
    return actionForms.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <ActionInput handleDeleteAction={handleDeleteAction} defaultValue={(initialActions && initialActions[idx]) || ''} idx={idx} id={id} dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} setRef={provided.innerRef} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This device currently has no actions" />
})

export default (props) => {
  const dispatch = useDispatch();
  const onDragEnd = useCallback(
    (from, to) => dispatch(reorderDeviceAction(from, to)),
    [dispatch]
  )
  const handleDeleteAction = useCallback(
    (idx) => dispatch(removeDeviceAction(idx)),
    [dispatch]
  )
  const handleAddAction = useCallback(
    () => dispatch(addDeviceAction()),
    [dispatch]
  )
  return(<>
    <Bar title="Actions" right={
      <button className="primary button align_center header_bar__button" onClick={handleAddAction}>
        Add Action
      </button>
    } />
    <DNDActionFields onDragEnd={onDragEnd} handleDeleteAction={handleDeleteAction} {...props} className="device_form__action_list" />
    </>)
}
