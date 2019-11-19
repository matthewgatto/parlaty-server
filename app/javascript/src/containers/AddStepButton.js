import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';
import AddButton from '../components/AddButton';
import { setStep } from '../redux/reducers/form';

function AddStepButton(props){
  const {values: {steps}} = useFormikContext();
  const addStep = () => {
    if(props.canAdd){
      props.pushStep({mode: 'continuous', number: steps.length + 1, device: "Crank handle", actions: [{id: new Date().getTime(), value: ''}], skip: true, time: 8, id: new Date().getTime()})
      props.setStep({idx: steps.length})
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
