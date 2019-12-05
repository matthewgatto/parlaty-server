import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import Button from '../components/Button';

function FormSubmitButton(props){
  const {setErrors} = useFormikContext();

  useEffect(() => {
    setErrors(props.fieldErrors)
  }, [props.fieldErrors, setErrors])


  return <Button text={props.text} isLoading={props.isProcessing} className={props.className} />
}

export default connect(
  ({meta, form}, {id, entityKey}) => {
    const formState = (id && entityKey) ? meta[entityKey][id] : form.meta
    return({
      fieldErrors: (formState && formState.fieldErrors) ? formState.fieldErrors : {},
      isProcessing: formState ? formState.isProcessing : false
    })
  },
)(FormSubmitButton)
