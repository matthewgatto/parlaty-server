import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import withModal from '@containers/withModal';
import { deleteProcedure } from '@actions/procedure';

export default withModal(({procedure_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteProcedure(procedure_id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="procedure" />
  )
}, "delete_procedure_confirmation")
