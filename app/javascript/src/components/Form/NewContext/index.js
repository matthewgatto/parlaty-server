import React, {useEffect,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { useForm as useReactHookForm, FormContext } from "react-hook-form";
import { mountForm, unmountForm } from '@actions/form';


const withFormKey = fn => (props) => fn(props, `${props.entity},${props.id}`)
export const useForm = withFormKey((options, formKey) => {
   const form = useReactHookForm({defaultValues:options.initialValues}),
        dispatch = useDispatch(),
        handleSubmit = () => {
          const values = form.getValues();
          dispatch({type: options.type, payload: {id: options.id, entityKey: options.entity, url: options.url, formKey, values: options.extraValues ? {...values, ...options.extraValues} : values}})
        }
  useMountForm(dispatch, formKey, options.initialValues, options.submitOnEnter ? handleSubmit : undefined)
  return {handleSubmit, formKey, form}
})

const useMountForm = (dispatch, formKey, initialValues, submitOnEnterPress) => {
  useEffect(() => {
    if(submitOnEnterPress){
      const handleKeyPress = (e) => {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            submitOnEnterPress();
        }
      }
      document.removeEventListener("keypress", handleKeyPress);
      document.addEventListener("keypress", handleKeyPress);
      return () => {
        document.removeEventListener("keypress", handleKeyPress);
      }
    }
  }, [submitOnEnterPress])
  useEffect(() => {
    dispatch(mountForm(formKey, initialValues));
    return () => {
      dispatch(unmountForm(formKey));
    }
  },[dispatch,formKey,initialValues])
}


export default ({className, children, ...props}) => {
  const {handleSubmit, formKey, form} = useForm(props)
  return(
    <FormContext {...form}>
      <div className={className}>
        {children({handleSubmit, formKey, form})}
      </div>
    </FormContext>
  )
}
