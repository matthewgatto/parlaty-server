import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import {addActionForm} from '../redux/actions/action';
import {getLastActionId} from '../redux/selectors/action';
import useActionValues from './useActionValues';
import AddFormButton from '../components/Form/Nested/AddFormButton';

export default ({formKey}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const lastActionId = useSelector(getLastActionId)
  const handleClick = () => dispatch(addActionForm(formKey, lastActionId ? useActionValues(getValues, `actions[${lastActionId}].`) : undefined, true));
  return <AddFormButton text="Add Action" onClick={handleClick} />
}
