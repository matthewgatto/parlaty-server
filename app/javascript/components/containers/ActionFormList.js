import React,{useEffect} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderActionForm,removeActionForm,addActionForm,loadActionForms,clearActionForms} from '@actions/action';
import {getActionForms} from '@selectors/action';
import withDND from '@components/withDND';
import Placeholder from '@components/Placeholder';
import ActionForm from './ActionForm';

const DNDActionFields = withDND(({initialActions, formKey}) => {
  const actionForms = useSelector(getActionForms);
  if(actionForms.length > 0){
    return actionForms.map((action,idx) => (
      <Draggable key={action.formId} draggableId={action.formId} index={idx}>
        {(provided, snapshot) => <ActionForm idx={idx} id={action.id} formId={action.formId} provided={provided} color={snapshot.isDragging} formKey={formKey} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This device currently has no actions" />
});

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(props.initialActions && props.initialActions.length > 0){
      dispatch(loadActionForms(props.initialActions))
    }
    return () => dispatch(clearActionForms())
  }, []);
  const handleDragEnd = (from, to) => dispatch(reorderActionForm(from, to));
  return <DNDActionFields onDragEnd={handleDragEnd} {...props} className="device_form__action_list" />
}
