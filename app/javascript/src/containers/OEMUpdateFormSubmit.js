import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import Button from '../components/Button';

function FormSubmitButton(props){
  const {setErrors} = useFormikContext();

  useEffect(() => {
    setErrors(props.fieldErrors)
  }, [props.fieldErrors, setErrors])


  return <Button text={props.text} isLoading={props.isProcessing} />
}

export default connect(
  ({meta}, {id}) => {
    const formState = meta.oems[id]
    return({
      fieldErrors: (formState && formState.fieldErrors) ? formState.fieldErrors : {},
      isProcessing: formState.isProcessing
    })
  },
)(FormSubmitButton)
