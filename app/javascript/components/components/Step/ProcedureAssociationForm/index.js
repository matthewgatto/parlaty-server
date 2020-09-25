import React from "react";
import {CheckBox} from '@components/Inputs';
import styles from './index.module.css';
import {useFormContext} from "react-hook-form";
import ProcedureSelect from '@containers/ProcedureSelect';

const SelectProcedure = ({defaultValue, className, ...props}) => {
  const {watch} = useFormContext();
  let enabled = watch(`${props.root}enabled_associated_procedure`);
  if(!enabled) className += " " + styles.disabled;
  return (<>
      <ProcedureSelect className={className} disabled={!enabled} {...props} associatedProcedureId={defaultValue.associated_procedure_id} />
    </>)
};

export default ({ defaultValue, ...props }) => (
  <div className={styles.container}>
    <CheckBox {...props} checked={defaultValue.enabled_associated_procedure || false} label="Associate step with another procedure" name="enabled_associated_procedure" defaultValue={defaultValue.enabled_associated_procedure || false} />
    <SelectProcedure {...props} defaultValue={defaultValue}/>
  </div>
)