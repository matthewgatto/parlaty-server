import React,{useCallback} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderActionForm,removeActionForm,addActionForm} from '../redux/actions/action';
import {getActionForms} from '../redux/selectors/action';
import withDND from '../components/withDND';
import Placeholder from '../components/Placeholder';
import Bar from '../components/Bar/Large';
import ActionForm from '../components/Action/Form';

const DNDActionFields = withDND(({initialActions, handleDeleteAction, formKey}) => {
  const actionForms = useSelector(getActionForms);
  if(actionForms.length > 0){
    return actionForms.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <ActionForm handleDeleteAction={handleDeleteAction} idx={idx} id={id} dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} setRef={provided.innerRef} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This device currently has no actions" />
})

export default (props) => {
  const dispatch = useDispatch();
  const handleDragEnd = (from, to) => dispatch(reorderActionForm(from, to))
  const handleDeleteAction = (idx) => dispatch(removeActionForm(idx))
  const handleAddAction = () => dispatch(addActionForm())
  return(<>
    <Bar title="Actions" right={
      <button className="primary button align_center header_bar__button" onClick={handleAddAction}>
        Add Action
      </button>
    } />
    <DNDActionFields onDragEnd={handleDragEnd} handleDeleteAction={handleDeleteAction} {...props} className="device_form__action_list" />
    </>)
}
