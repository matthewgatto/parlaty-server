import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useForm as useReactHookForm, FormContext } from "react-hook-form";
import { mountForm, unmountForm } from '../../redux/actions/form';


const withFormKey = fn => (props) => fn(props, `${props.entity},${props.id}`)
export const useForm = withFormKey((options, formKey) => {
   const form = useReactHookForm({defaultValues:options.initialValues}),
        dispatch = useDispatch(),
        handleSubmit = async () => {
          try {
            const values = form.getValues();
            await options.validationSchema.validate(values, {abortEarly: false, stripUnknown: true});
            dispatch({type: options.type, payload: {id: options.id, entityKey: options.entity, url: options.url, formKey, values: options.extraValues ? {...values, ...options.extraValues} : values}})
          } catch (e) {
            console.log("e", e);
            const errors = {};
            for (var i = 0; i < e.inner.length; i++) {
              errors[e.inner[i].path] = e.inner[i].message
            }
            dispatch({type: `${options.type}__FAILURE`, payload: {formKey, errors:{fieldErrors: errors}}})
          }
        }
  useMountForm(dispatch, formKey, options.initialValues, options.submitOnEnter ? handleSubmit : undefined)
  return {handleSubmit, formKey, form}
})

const useMountForm = (dispatch, formKey, initialValues, submitOnEnterPress) => {
  const handleKeyPress = (e) => {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        submitOnEnterPress();
    }
  }
  useEffect(() => {
    if(submitOnEnterPress){
      document.addEventListener("keypress", handleKeyPress);
    }
    dispatch(mountForm(formKey, initialValues));
    return () => {
      if(submitOnEnterPress){
        document.removeEventListener("keypress", handleKeyPress);
      }
      dispatch(unmountForm(formKey));
    }
  }, [])
}

export default ({className, children, wrapperId,...props}) => {
  const {handleSubmit, formKey, form} = useForm(props)
  return(
    <FormContext {...form}>
      <div id={wrapperId} className={className}>
        {children({handleSubmit, formKey, form})}
      </div>
    </FormContext>
  )
}
