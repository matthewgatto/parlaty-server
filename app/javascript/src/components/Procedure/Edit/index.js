import React, {useEffect,useMemo,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '@components/PageLayout';
import FetchLoader from '@components/List/Loader';
import Name from '@containers/Name';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import withModal from '@containers/withModal';
import ProcedureForm from '../EditForm';
import DeviceForm from '@components/Device/Create';
import DeviceUpdateForm from '@components/Device/Edit';
import DeviceCopyList from '../DeviceCopyList'
import DeviceManagerModal from '../DeviceManagerModal'
import DeleteProcedureConfirmationModal from '../DeleteConfirmationModal'
import DeleteDeviceConfirmationModal from '@components/Device/DeleteConfirmationModal';
import { UPDATE_PROCEDURE_REQUEST, FETCH_PROCEDURE_REQUEST } from '@types/procedure';
import { loadStepForms } from '@actions/step';
import { getProcedureById } from '@selectors/procedure';

const DeviceCreateModal = withModal(DeviceForm, "create_device");
const ProcedureDeviceModal = withModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = withModal(DeviceUpdateForm, "update_device");

const withStepLoader = (WrappedComponent) =>  (
  class extends React.PureComponent {
    componentDidUpdate(prevProps){
      if((!prevProps.initialValues || !prevProps.initialValues.steps) && (this.props.initialValues && this.props.initialValues.steps && this.props.initialValues.steps.length > 0)){
        this.props.addSteps()
      }
    }
    render(){
      if(!this.props.initialValues || !this.props.initialValues.description){
        return <FetchLoader text="Procedure" />
      }
      return <WrappedComponent {...this.props} />
    }
  }
)

const EditProcedureForm = ({initialValues, id, oem_business_id}) => useMemo(() => (
  <ProcedureForm
    url={`/procedures/${id}`}
    type={UPDATE_PROCEDURE_REQUEST}
    initialValues={initialValues}
    extraValues={{oem_business_id}}
    id={initialValues.id}
    procedure_id={id}
    business_id={oem_business_id}
  />
),[])

const EditProcedureFormWithStepLoader = withStepLoader(EditProcedureForm);

const EditProcedureFormContainer = (props) => {
  const dispatch = useDispatch();
  const addSteps = () => dispatch(loadStepForms(props.initialValues.steps))
  useEffect(() => {
    if(!props.initialValues || !props.initialValues.description){
      dispatch({type: FETCH_PROCEDURE_REQUEST, payload: {url: `/procedures/${props.id}`, id: props.id}})
    }
    if(props.initialValues && props.initialValues.steps && props.initialValues.steps.length > 0){
      addSteps();
    }
  },[])
  return <EditProcedureFormWithStepLoader addSteps={addSteps} {...props} />
}

export default ({match:{params:{oem_id,business_id,id}}}) => {
  const initialValues = useSelector(getProcedureById(id));
  var name = initialValues && initialValues.name;
  return(<>
    <PageLayout
      header={`Edit ${name ? name : "Procedure"}`}
      back={business_id ? ({
        to: oem_id ? `/oems/${oem_id}/businesses/${business_id}` : `/businesses/${business_id}`,
        label: <Name entityKey="businesses" id={business_id} />
      }) : ({
        to: "/",
        label: "Home"
      })}
      buttons={<ModalTrigger modal="delete_procedure_confirmation"><SubmitButton primary label="Delete Procedure" /></ModalTrigger>}
    >
      <EditProcedureFormContainer id={id} oem_business_id={business_id} initialValues={initialValues} />
    </PageLayout>
    <DeleteProcedureConfirmationModal procedure_id={id} />
    <DeleteDeviceConfirmationModal procedure_id={id} />
    <DeviceManagerModal name={name} procedure_id={id} />
    <DeviceCreateModal name={name} procedure_id={id} />
    <ProcedureDeviceModal business_id={business_id} />
    <DeviceUpdateModal name={name} />
  </>)
}
