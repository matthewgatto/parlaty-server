import React from 'react';
import {useSelector} from 'react-redux';
import OemBusinessSelect from '@containers/OemBusinessSelect';
import UserOemBusinessSelect from '@containers/UserOemBusinessSelect';
import {getProcedureOemBusinesses} from '@selectors/procedure';

export default ({procedure_id,oem_id,...props}) => {
  const oem_businesses = useSelector(getProcedureOemBusinesses(procedure_id))
  return oem_id ? (
    <OemBusinessSelect defaultValue={oem_businesses} client={oem_id} />
  ) : (
    <UserOemBusinessSelect defaultValue={oem_businesses} />
  )
}
