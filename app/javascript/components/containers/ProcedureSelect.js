import { useSelector} from "react-redux";
import React from "react";
import {Select} from '@components/Inputs';
import { getOemBusinessById }from '@selectors/oem_business';
import { getOemById } from '@selectors/oem';

export default ({formKey, disabled, oemBusinessId, associatedProcedureId, procedureId, onChange}) => {
  const oemBusiness = oemBusinessId && useSelector(getOemBusinessById(oemBusinessId));
  const oem = oemBusiness && useSelector(getOemById(oemBusiness.oem_id));
  const procedures = oem && oem.procedures_names && oem.procedures_names.filter(p => parseInt(p.id) !== parseInt(procedureId));
  const proceduresSelect = procedures && procedures.map(p => ({value: p.id, label: p.name}))
  const associatedProcedureValue = proceduresSelect && (proceduresSelect.some(e => parseInt(e.value) === parseInt(associatedProcedureId))) ? associatedProcedureId : undefined;
  return(
    <Select defaultValue={ associatedProcedureValue } onChange={onChange} disabled={disabled} options={proceduresSelect || []} label="Procedure to associate" name="associated_procedure_id" formKey={formKey} placeholder="Choose a procedure..." />
  )
}