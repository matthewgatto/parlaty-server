import React,{useCallback} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderActionForm,removeActionForm,addActionForm} from '../redux/actions/action';
import {getActionForms} from '../redux/selectors/action';
import withDND from '../components/withDND';
import Placeholder from '../components/Placeholder';
import Bar from '../components/Bar/Large';
import ActionForm from './ActionForm';

const DNDActionFields = withDND(({initialActions, formKey}) => {
  const actionForms = useSelector(getActionForms);
  if(actionForms.length > 0){
    return actionForms.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <ActionForm idx={idx} id={id} provided={provided} formKey={formKey} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This device currently has no actions" />
})

export default (props) => {
  const dispatch = useDispatch();
  const handleDragEnd = (from, to) => dispatch(reorderActionForm(from, to))
  return <DNDActionFields onDragEnd={handleDragEnd} {...props} className="device_form__action_list" />
}
