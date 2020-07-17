import React, {useEffect,useMemo,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '@components/PageLayout';
import FetchLoader from '@components/List/Loader';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import withModal from '@containers/withModal';
import ProcedureForm from '../EditForm';
import DeviceForm from '@components/Device/Create';
import DeviceUpdateForm from '@components/Device/Edit';
import DeviceCopyList from '../DeviceCopyList'
import ImagePreviewModal from '@components/ImagePreviewModal';
import VideoPreviewModal from '@components/VideoPreviewModal';
import VideoProgressModal from '@components/VideoProgressModal';
import ProcedureCategories from '@components/Procedure/Categories';
import DeviceManagerModal from '../DeviceManagerModal'
import DeleteProcedureConfirmationModal from '../DeleteConfirmationModal'
import DeleteDeviceConfirmationModal from '@components/Device/DeleteConfirmationModal';
import { UPDATE_PROCEDURE_REQUEST, FETCH_PROCEDURE_REQUEST } from '@types/procedure';
import { loadStepForms } from '@actions/step';
import { getProcedureById } from '@selectors/procedure';

const DeviceCreateModal = withModal(DeviceForm, "create_device");
const ProcedureDeviceModal = withModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = withModal(DeviceUpdateForm, "update_device");
const ProcedureCategoriesModal = withModal(ProcedureCategories, "add_category");

const withStepLoader = (WrappedComponent) =>  (
  class extends React.PureComponent {
    componentDidUpdate(prevProps){
      if((!prevProps.initialValues || !prevProps.initialValues.steps) && (this.props.initialValues && this.props.initialValues.steps && this.props.initialValues.steps.length > 0)){
        this.props.addSteps()
      }
    }
    render(){
      if(!this.props.initialValues || typeof this.props.initialValues.description === 'undefined'){
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


export default ({match:{params:{oem_id,business_id,id}}}) => {
  const initialValues = useSelector(getProcedureById(id));
  let name = initialValues && initialValues.name;
  const dispatch = useDispatch();
  const addSteps = () => dispatch(loadStepForms(initialValues.steps_order))
  useEffect(() => {
    // if(!initialValues || typeof initialValues.description === 'undefined'){
    dispatch({type: FETCH_PROCEDURE_REQUEST, payload: {url: `/procedures/${id}`, id}})
    // }
    if(initialValues && initialValues.steps && initialValues.steps.length > 0){
      addSteps();
    }
  },[])
  return(<>
    <PageLayout
      header={`Edit ${name ? name : "Procedure"}`}
      back={business_id ? ({
        to: oem_id ? `/oems/${oem_id}/businesses/${business_id}` : `/businesses/${business_id}`,
        label: "Choose A Different Procedure"
      }) : ({
        to: "/",
        label: "Home"
      })}
      buttons={<ModalTrigger modal="delete_procedure_confirmation"><SubmitButton primary label="Delete Procedure" /></ModalTrigger>}
    >
      <EditProcedureFormWithStepLoader id={id} oem_business_id={business_id} addSteps={addSteps} initialValues={initialValues} />
    </PageLayout>
    <DeleteProcedureConfirmationModal procedure_id={id} />
    <DeleteDeviceConfirmationModal procedure_id={id} />
    <DeviceManagerModal name={name} procedure_id={id} />
    <DeviceCreateModal name={name} procedure_id={id} />
    <ProcedureDeviceModal business_id={business_id} />
    <DeviceUpdateModal name={name} />
    <ProcedureCategoriesModal procedure_id={id} oem_id={oem_id} />
    <ImagePreviewModal />
    <VideoPreviewModal />
    <VideoProgressModal />
  </>)
}
