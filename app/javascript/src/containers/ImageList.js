import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form"
import Placeholder from '../components/Placeholder';
import ProcedureImage from './ProcedureImage';
import { removeImage } from '../redux/actions/step';

export default () => {
  const images = useSelector(({steps}) => steps.images);
  const { setValue } = useFormContext()
  const dispatch = useDispatch();
  const handleCloseIconClick = (id) => () => {
    dispatch(removeImage(id));
    setValue(`steps[${id}].image`, '');
  }
  return images.length > 0 ? (
      images.map(image => <ProcedureImage key={image.id} image={image} handleCloseIconClick={handleCloseIconClick} />)
    ) : (
      <Placeholder text="This procedure currently has no images" />
    )
}
