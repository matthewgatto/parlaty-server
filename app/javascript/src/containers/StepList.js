import React,{useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setStepForm,reorderStep} from '../redux/actions/step';
import withDND from '../components/withDND';
import Placeholder from '../components/Placeholder';
import Step from './Step';

const StepList = withDND(({steps, ...props}) => steps.map((id, idx) => <Step key={id} id={id} idx={idx} {...props} />))

const makePositionOptions = (stepCount) => {
  const options = [{value: 1, label: "Number 1"}]
  for (var i = 2; i < stepCount + 1; i++) {
    options.push({value: i, label: "Number "+i})
  }
  return options
}

export default (props) => {
  const devices = useSelector(({devices}) => devices.allIds.map(id => ({value: id, label: devices.byId[id].name})));
  const steps = useSelector(({steps}) => steps.forms);
  const dispatch = useDispatch();
  const onDragEnd = useCallback(
    (from, to) => dispatch(reorderStep(props.procedure_id, from, to)),
    [dispatch,props.procedure_id]
  )
  const onBeforeCapture = useCallback(
    () => dispatch(setStepForm(props.formKey)),
    [dispatch,props.formKey]
  )
  if(steps.length > 0){
    const positions = makePositionOptions(steps.length)
    return <StepList steps={steps} positions={positions} onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd} {...props} devices={devices}  />
  }
  return <Placeholder text="This procedure currently has no steps" />
}
