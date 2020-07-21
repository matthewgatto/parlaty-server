import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import withModal from '@containers/withModal';
import { deleteOemBusiness } from '@actions/oem_business';

export default withModal(({oem_business_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteOemBusiness(oem_business_id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="site" />
  )
}, "delete_oem_businesses_confirmation")
