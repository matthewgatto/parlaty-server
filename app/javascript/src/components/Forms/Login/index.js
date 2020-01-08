import React, {useEffect,useRef,useState,useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm as useReactHookForm, Controller, useFormContext,FormContext } from "react-hook-form";
import Error from '../../Error';
import Loader from '../../Loader';
import Placeholder from '../../Placeholder';
import { mountForm, unmountForm, addStepForm } from '../../../redux/actions/form';
import Triangle from '../../SVG/Triangle';
import Close from '../../SVG/Close';
import Upload from '../../SVG/Upload';
import Burger from '../../SVG/Burger';

export const FormError = ({formKey, ...props}) => <Error error={useSelector(({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.formError ? form[formKey].errors.formError : null)} {...props} />
const InputError = ({formKey, name, ...props}) => <Error error={useSelector(({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.fieldErrors ? form[formKey].errors.fieldErrors[name] : undefined)} {...props} />

const makeButtonClass = (secondary, className) => {
  const str = secondary ? "button secondary" : "button";
  return className ? `${str} ${className}` : str
}

export const SubmitButton = ({formKey, label, onClick, secondary, className}) => (
  <button className={makeButtonClass(secondary, className)} onClick={onClick}>
    {useSelector(({form}) => form[formKey] ? form[formKey].isProcessing : false) ? (
      <Loader fill={secondary ? "#67328d" : "#fff"} />
    ) : (
      label
    )}
  </button>
)

const Label = ({children, label, labelClass, formKey, name}) => (
  <label className={labelClass ? `field ${labelClass}` : "field"}>
    <div className="field__label">
      {label && <div>{label}</div>}
      {formKey && <InputError formKey={formKey} name={name} />}
    </div>
    {children}
  </label>
)
const withLabel = (WrappedComponent) => ({label, formKey, labelClass, ...props}) => (
  <Label name={props.name} labelClass={labelClass} label={label} formKey={formKey}>
    <WrappedComponent {...props} />
  </Label>
)

const useInitialValues = (name,initialValue) => {
  const { register, setValue } = useFormContext()
  useEffect(() => {
    if(initialValue !== undefined){
      setValue(name, initialValue)
    }
  },[])
  return register
}
const CheckBoxController = ({name,initialValue,onChange,checked,...props}) => {
  useInitialValues(name,initialValue)
  return <input onChange={onChange} type="checkbox" name={name} checked={checked || false} />
}

export const CheckBox = withLabel((props) => <Controller defaultValue={props.initialValue} onChange={([e]) => (e.currentTarget.checked)} name={props.name} as={<CheckBoxController name={props.name} intitialValue={props.initialValue} />} />)

const RadioController = (props) => (<>
  <Label label="Continuous">
    <input onChange={props.onChange} type="radio" name={props.name} value="continuous" checked={props.value === "continuous"} />
  </Label>
  <Label label="Manual">
    <input onChange={props.onChange} type="radio" name={props.name} value="manual" checked={props.value === "manual"} />
  </Label>
</>)

export const ModeRadios = props => <Controller defaultValue={props.initialValue} name={props.name} as={<RadioController name={props.name} />} />

export const Input = withLabel(props => <Controller {...props} as="input" />)
export const Textarea = withLabel(props => <Controller {...props} as="textarea" />)


export const ActionInput = ({id, idx, handleDeleteAction, setRef, defaultValue, dragHandleProps, draggableProps}) => {
  const name = `actions[${id}]`
  return(
    <div {...dragHandleProps} {...draggableProps} ref={setRef} className="action_input">
      <Burger className="action_input__burger" width="1.1em" height="1.1em" />
      <Controller defaultValue={defaultValue} type="text" name={name} as="input" />
      <Close onClick={() => {handleDeleteAction(idx)}} className="action_input__icon" />
    </div>
  )
}

/*
export const ActionInput = ({id, idx, handleRemove, setRef, defaultValue, root, dragHandleProps, draggableProps}) => (
  <div {...dragHandleProps} {...draggableProps} ref={setRef} className="action_input">
    <Burger className="action_input__burger" width="1.1em" height="1.1em" />
    <div className="action_input__text">{idx + 1}</div>
    <Input defaultValue={defaultValue} type="text" name={`${root}actions[${id}]`} />
    <Close onClick={() => {handleRemove(id)}} className="action_input__icon" />
  </div>
)
*/
const getInputText = (value) => {
  if(value){
    if(typeof value === 'string') return "File"
    if(typeof value.name === 'string') return value.name
  }
  return "Upload"
}

const FileInputController = ({label, name, initialValue, value, onChange}) => {
  const inputRef = useRef(null);
  const { setValue } = useFormContext()
  const inputText = getInputText(value)
  const handleClick = () => {
    if(value){
      setValue(name, null);
      inputRef.current.value = null;
    } else {
      inputRef.current.click();
    }
  }
  useEffect(() => {
    if(!value){
      inputRef.current.value = null;
    }
  },[value])
  return(
    <div className="file_input" onClick={handleClick}>
      <label>{label}</label>
      <span className="file_input__button">
      <div className="file_input__name">{inputText}</div>
      {inputText === "Upload" ? (
        <Upload className="file_input__icon" />
      ) : (
        <Close className="file_input__icon" />
      )}
      </span>
      <input ref={inputRef} className="file_input__hidden" name={name} type="file" onChange={onChange} />
    </div>
  )
}

export const FileInput = ({initialValue, ...props}) => <Controller onChange={([el]) => el.currentTarget.files[0]} defaultValue={initialValue} name={props.name} as={<FileInputController {...props} />} />


const SelectComponent = ({onChange, name, value, options}) => (
  <select onChange={onChange} name={name} value={value}>
    {(options && options.length > 0) ? (
      options.map(option =>
        <option key={option.value} value={option.value}>{option.label}</option>
      )
    ) : null}
  </select>
)

const withSelectContainer = WrappedComponent => props => (
  <div className="select">
    <WrappedComponent {...props} />
    <Triangle className="select__icon" />
  </div>
)

export const Select = withLabel(withSelectContainer(props => <Controller defaultValue={props.defaultValue} name={props.name} as={<SelectComponent name={props.name} options={props.options} />} />))

const DeviceSelectComponent = withLabel(withSelectContainer(SelectComponent));

const DeviceSelectContainer = ({value, ...props}) => {
  const device = useSelector(({devices}) => devices.byId[value]);
  return(<>
    <DeviceSelectComponent value={value} {...props} />
    <div className="device_select__action_list">
      {(device && device.actions && device.actions.length > 0) ? (
        device.actions.map((action, i) => (
          <div className="device_select__action_list__item" key={i}>
            <div className="device_select__action_list__item_number">{i+1}.</div>
            <div className="device_select__action_list__item_text">{action}</div>
          </div>
        ))
      ) : (
        <div>No actions</div>
      )}
    </div>
  </>)
}
export const DeviceSelect = ({defaultValue,...props}) => <Controller defaultValue={defaultValue || "1"} name={props.name} as={<DeviceSelectContainer {...props} />} />


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
