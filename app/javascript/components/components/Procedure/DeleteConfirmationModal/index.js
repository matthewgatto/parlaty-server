import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import activeModal from '@containers/activeModal';
import { deleteProcedure } from '@actions/procedure';

export default activeModal(({procedure_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteProcedure(procedure_id));
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="procedure" />
  )
}, "delete_procedure_confirmation")
