import React,{useCallback,useEffect,useState} from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form"
import AnimateHeight from 'react-animate-height';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Input, Select, FileInput, ModeRadios,CheckBox,ActionInput,DeviceSelect,FormError} from '../Login';
import Placeholder from '../../Placeholder';
import StepMenu from '../../../containers/StepMenu';
import Loader from '../../Loader';
import Add from '../../SVG/Add';
import HeaderBar from '../../HeaderBar';
import {mountForm,unmountForm} from '../../../redux/actions/form';
import {setStepForm,removeStepForm,reorderStep,addStepForm,deleteStep} from '../../../redux/actions/step';
import {reorderDeviceAction,removeDeviceAction,addDeviceAction} from '../../../redux/actions/device';

import {STEP_SAVE_REQUEST,STEP_SAVE_REQUEST__FAILURE} from '../../../redux/types/step';
import { stepSchema } from '../validation';
import {immutableMove} from '../../../utils';
import uuid from 'uuid/v4';

const findStepValues = (getValues, root) => {
  const values = getValues();
  return({
    title: values[`${root}title`],
    number: values[`${root}number`],
    time: values[`${root}time`],
    mode: values[`${root}mode`],
    skip: values[`${root}skip`],
    image: values[`${root}image`],
    audio: values[`${root}audio`],
    location: values[`${root}location`],
    device: values[`${root}device`],
    parameter_name: values[`${root}parameter_name`]
  })
}

const isAStepFormOpen = ({steps}) => !!steps.open

export const AddStepButton = ({formKey}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const stepFormOpen = useSelector(isAStepFormOpen)
  const lastStepId = useSelector(({steps}) => steps.forms[steps.forms.length - 1])
  const handleClick = () => dispatch(addStepForm(formKey, lastStepId ? findStepValues(getValues, `steps[${lastStepId}].`) : {mode: "continuous", time: 8, skip: true}, true));
  return(
    <div onClick={stepFormOpen ? undefined : handleClick} className="step_header color">
      <Add className="add_step_icon" />

      <div className="step_header__text">Add Step</div>
    </div>
  )
}

function StepHeader({provided, idx, procedure_id, formKey, getValues, id, name, root}){
  const formOpen = useSelector(isAStepFormOpen);
  const dispatch = useDispatch();
  const handleClick = () => !formOpen ? dispatch(setStepForm(formKey, {id, initialValues:{...findStepValues(getValues, root), number: idx+1}})) : null
  const duplicateStep = (e) => {
    e.stopPropagation();
    dispatch(addStepForm(formKey, findStepValues(getValues, root), true));
  }
  const handleDeleteStep = (e) => {
    e.stopPropagation();
    if(procedure_id){
      dispatch(deleteStep(id, idx, procedure_id));
    }
    dispatch(removeStepForm(formKey, idx))
  }
  return(
    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={handleClick} className="step_header">
      <div className="step_header__text">Step {idx + 1}</div>
      <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={handleDeleteStep} isFormOpen={formOpen} />
    </div>
  )
}

function StepSaveButton({formKey, onClick}){
  const isProcessing = useSelector(({form}) => form[formKey] && form[formKey].isProcessing)
  return(
    <div className="step_button" onClick={isProcessing ? undefined : onClick}>
      {isProcessing ? <Loader fill="#fff" /> : <div className="step_button__text">Save</div>}
    </div>
  )
}

const withDND = (WrappedComponent) => ({onDragEnd, onBeforeCapture, className, ...props }) => {
  const handleDragEndIfValid = ({source, destination}) => {
    if (!destination || destination.index === source.index) {
      return;
    }
    onDragEnd(source.index, destination.index)
  }
  return(
    <DragDropContext onDragEnd={handleDragEndIfValid} onBeforeCapture={onBeforeCapture} >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={className}>
            <WrappedComponent {...props} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const ActionFields = ({initialActions, handleDeleteAction, formKey}) => {
  const actionForms = useSelector(({devices}) => devices.forms);
  if(actionForms.length > 0){
    return actionForms.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <ActionInput handleDeleteAction={handleDeleteAction} defaultValue={initialActions && initialActions[idx]} idx={idx} id={id} dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} setRef={provided.innerRef} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This device currently has no actions" />
  /*
  if(actions && actions.length > 0){
    return actions.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <ActionInput id={id} defaultValue={initialActions && initialActions[idx]} handleRemove={handleRemove} idx={idx} dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} setRef={provided.innerRef} />}
      </Draggable>
    ))
  }
  return <div>No Actions</div>
  */
}

const DNDActionFields = withDND(ActionFields)
export const ActionFieldsContainer = (props) => {
  const dispatch = useDispatch();
  const onDragEnd = useCallback(
    (from, to) => dispatch(reorderDeviceAction(from, to)),
    [dispatch]
  )
  const handleDeleteAction = useCallback(
    idx => dispatch(removeDeviceAction(idx)),
    [dispatch]
  )
  const handleAddAction = useCallback(
    () => dispatch(addDeviceAction()),
    [dispatch]
  )
  return(<>
    {/*<label className="field_label">Actions</label>*/}
    <HeaderBar title="Add Actions" right={
      <button className="header_bar__button" onClick={handleAddAction}>
        Add Action
      </button>
    } />
    <DNDActionFields onDragEnd={onDragEnd} handleDeleteAction={handleDeleteAction} {...props} className="device_form__action_list" />
    {/*<div className="action_list__add_button" onClick={handleAddClick}><Add className="action_list__add_button__icon" /> Add Action</div>*/}
    </>)
}


const TIME_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]

function Step({idx, procedure_id, formKey, provided, id, positions, initialValue, devices}){
  const root = `steps[${id}].`
  const stepFormKey = `step,${id}`
  const { getValues, setValue } = useFormContext()
  const isOpen = useSelector(({steps:{open}}) => open && open.id === id ? open : false);
  const isDuplicate = isOpen && isOpen.isDuplicate;
  const initValues = isDuplicate ? isOpen.initialValues : (initialValue || {});
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const step = findStepValues(getValues, root)
      await stepSchema.validate(step, {abortEarly: false, stripUnknown: true})
      dispatch({type: STEP_SAVE_REQUEST, payload: {procedureFormKey: formKey, procedure_id, id, formKey: `step,${id}`, step}})
    } catch (e) {
      console.log("e",e);
      if(e.inner && e.inner.length > 0){
        const fieldErrors = {};
        for (var i = 0; i < e.inner.length; i++) {
          fieldErrors[`${root}${e.inner[i].path}`] = e.inner[i].message
        }
        dispatch({type: STEP_SAVE_REQUEST__FAILURE, payload: {formKey: stepFormKey, errors:{fieldErrors}}})
      }
    }
  }
  const handleCloseButtonClick = () => {
    if(!isDuplicate){
      dispatch(setStepForm(formKey))
      for (var field in isOpen.initialValues) {
        if (isOpen.initialValues.hasOwnProperty(field)) {
          setValue(`${root}${field}`, isOpen.initialValues[field])
        }
      }
    } else {
      dispatch(setStepForm(formKey))
      dispatch(removeStepForm(formKey, idx))
    }
  }
  useEffect(() => {
    if(isOpen){
      dispatch(mountForm(stepFormKey, isOpen.initialValues));
    } else {
      dispatch(unmountForm(stepFormKey));
    }
    return () => {
      if(isOpen){
        dispatch(unmountForm(`step,${id}`));
      }
    }
  }, [isOpen])
  return(<>
    <StepHeader procedure_id={procedure_id} isOpen={isOpen ? true : false} idx={idx} id={id} formKey={formKey} getValues={getValues} provided={provided} root={root} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className="step_form">
        <Input defaultValue={initValues.title} formKey={stepFormKey} type="text" required label="Title*" name={`${root}title`} />
        <CheckBox labelClass="spoken_box" label="Spoken" name={`${root}spoken`} initialValue={initValues.spoken || false} />
        <Select defaultValue={idx+1} formKey={stepFormKey} label="Number*" name={`${root}number`} options={positions} />
        <Select options={TIME_OPTIONS} label="Time*" name={`${root}time`} defaultValue={initValues.time} />
        <div className="step_form__boxes">
          <ModeRadios name={`${root}mode`} initialValue={initValues.mode} />
          <CheckBox label="Option to Skip" name={`${root}skip`} initialValue={initValues.skip || false} />
        </div>
        <Input defaultValue={initValues.location} formKey={stepFormKey} type="text" required label="Location*" name={`${root}location`}  />
        <DeviceSelect options={devices} label="Device*" name={`${root}device`} defaultValue={initValues.device} />
        <Input defaultValue={initValues.parameter_name} formKey={stepFormKey} type="text" required label="Parameter*" name={`${root}parameter_name`} />
        <div className="step_form__files">
          <FileInput initialValue={initValues.image} label="Image*" name={`${root}image`} />
          <FileInput initialValue={initValues.audio} label="Audio*" name={`${root}audio`} />
        </div>
        <div className="step_error_container">
          <FormError formKey={stepFormKey} large />
        </div>
        <StepSaveButton onClick={handleSubmit} formKey={stepFormKey} />
        <div className="step_button secondary" onClick={handleCloseButtonClick}>
          <div className="step_button__text">Close</div>
        </div>
      </div>
    </AnimateHeight>
  </>)
}

const makePositionOptions = (stepCount) => {
  const options = [{value: 1, label: "Number 1"}]
  for (var i = 2; i < stepCount + 1; i++) {
    options.push({value: i, label: "Number "+i})
  }
  return options
}




const StepList = ({formKey, initialStepIds, procedure_id, devices}) => {
  const stepMap = useSelector(({steps}) => steps.byId)
  const steps = useSelector(({steps}) => steps.forms);
  if(steps.length > 0){
    const positions = makePositionOptions(steps.length)
    return steps.map((id,idx) => (
      <Draggable key={id} draggableId={id} index={idx}>
        {(provided, snapshot) => <Step procedure_id={procedure_id} devices={devices} initialValue={stepMap[id]} idx={idx} formKey={formKey} provided={provided} id={id} positions={positions} />}
      </Draggable>
    ))
  }
  return <Placeholder text="This procedure currently has no steps" />
}

const DNDStepList = withDND(StepList);


export default (props) => {
  const devices = useSelector(({devices}) => devices.allIds.map(id => ({value: id, label: devices.byId[id].name})));
  const dispatch = useDispatch();
  const onDragEnd = useCallback(
    (from, to) => dispatch(reorderStep(props.procedure_id, from, to)),
    [dispatch,props.procedure_id]
  )
  const onBeforeCapture = useCallback(
    () => dispatch(setStepForm(props.formKey)),
    [dispatch, props.formKey]
  )
  return <DNDStepList onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd} {...props} devices={devices} />
}
