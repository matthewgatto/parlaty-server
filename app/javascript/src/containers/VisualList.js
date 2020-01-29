import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form"
import VisualList from '@components/Visuals/List';
import { removeImage } from '@actions/step';
import { getVisuals } from '@selectors/step';

export default () => {
  const visuals = useSelector(getVisuals);
  const { setValue } = useFormContext()
  const dispatch = useDispatch();
  const handleCloseIconClick = (id) => () => {
    dispatch(removeImage(id));
    setValue(`steps[${id}].visual`, '');
  }
  return <VisualList visuals={visuals} handleCloseIconClick={handleCloseIconClick} />
}
