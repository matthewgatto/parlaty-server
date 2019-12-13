import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';
import AddButton from '../components/AddButton';
import { setStep } from '../redux/actions';

function AddStepButton(props){
  const {values: {steps}} = useFormikContext();
  const addStep = () => {
    if(props.canAdd){
      const newStep = {procedure_id: props.procedure_id, mode: "continuous", number: steps.length + 1, device: "Crank handle", actions: [{id: new Date().getTime(), value: ''}], skip: true, time: 8, id: new Date().getTime()};
      if(props.procedure_id) newStep.procedure_id = props.procedure_id;
      props.pushStep(newStep);
      props.setStep({id: newStep.id, isCreating: props.procedure_id ? true : false, initialValues: {}})
    }
  }
  return(
    <AddButton text="Add Step" onClick={addStep} />
  )
}

export default connect(
  ({form}) => ({canAdd: form.step ? false : true}),
  {setStep}
)(AddStepButton)
