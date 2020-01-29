import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {addActionForm,removeActionForm} from '../redux/actions/action';
import useActionValues from './useActionValues';
import Form from '../components/Action/Form';

export default ({idx, id, isOpen, formKey, provided}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const handleDuplicateClick = (e) => {
    e.stopPropagation();
    dispatch(addActionForm(useActionValues(getValues), true));
  }
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(removeActionForm(idx))
  }
  return (
    <Form formKey={formKey} idx={idx} id={id} title={`Action ${idx+1}`} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} provided={provided} />
  )
}
