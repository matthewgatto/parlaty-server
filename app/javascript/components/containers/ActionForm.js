import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {addActionForm,removeActionForm} from '@actions/action';
import {getActionFormData} from '@selectors/action';
import {makeAction} from '@utils';
import Form from '@components/Action/Form';

export default ({idx, id, formId, isOpen, formKey, provided, color}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const actionMeta = useSelector(getActionFormData(id, idx))
  const root = `actions[${formId}].`;
  const initialValues = actionMeta.isDuplicate ? actionMeta.formValues : (actionMeta.storeValues || {})
  const handleDuplicateClick = (e) => {
    e.stopPropagation();
    dispatch(addActionForm(makeAction(getValues(), root), true));
  }
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(removeActionForm(idx))
  }
  return (
    <Form formKey={formKey} root={root} id={id} initialAction={initialValues} title={`Action ${idx+1}`} color={color} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} provided={provided} />
  )
}
