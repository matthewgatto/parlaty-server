import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import {addActionForm} from '@actions/action';
import {getLastActionId} from '@selectors/action';
import {makeAction} from '@utils';
import AddFormButton from '@components/Form/Nested/AddFormButton';

export default ({formKey}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  //const lastActionId = useSelector(getLastActionId)
  const handleClick = () => dispatch(addActionForm(/*lastActionId ? makeAction(getValues(), `actions[${lastActionId}].`) : undefined*/));
  return <AddFormButton text="Add Action" onClick={handleClick} />
}
