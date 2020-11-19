import React, {useEffect,useMemo,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '@components/PageLayout';
import FetchLoader from '@components/List/Loader';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import ProcedureForm from '../EditForm';
import DeviceForm from '@components/Device/Create';
import DeviceUpdateForm from '@components/Device/Edit';
import DeviceCopyList from '../DeviceCopyList'
import ImagePreviewModal from '@components/ImagePreviewModal';
import DocPreviewModal from '@components/DocPreviewModal';
import VideoPreviewModal from '@components/VideoPreviewModal';
import AudioPreviewModal from '@components/AudioPreviewModal';
import VideoProgressModal from '@components/VideoProgressModal';
import ProcedureOemBusinesses from '@components/Procedure/OemBusinesses';
import DeviceManagerModal from '../DeviceManagerModal'
import DeleteProcedureConfirmationModal from '../DeleteConfirmationModal'
import DeleteDeviceConfirmationModal from '@components/Device/DeleteConfirmationModal';
import DeleteAllCommentsModal from '@components/Step/DeleteAllCommentsModal';
import CommentsListModal from '@components/Comment/ListModal';
import ModalOverlay from '@components/Modal/Overlay';
import activeModal from '@containers/activeModal';
import { UPDATE_PROCEDURE_REQUEST, FETCH_PROCEDURE_REQUEST } from '@types/procedure';
import { loadStepForms } from '@actions/step';
import { getProcedureById } from '@selectors/procedure';
import { resetStepsValues } from "@actions/template";

const DeviceCreateModal = activeModal(DeviceForm, "create_device");
const ProcedureDeviceModal = activeModal(DeviceCopyList, "procedure_device_list");
const DeviceUpdateModal = activeModal(DeviceUpdateForm, "update_device");
const ProcedureOemBusinessesModal = activeModal(ProcedureOemBusinesses, "add_oem_business");

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
);

const EditProcedureForm = ({initialValues, id, oem_business_id}) => useMemo(() => (
  <ProcedureForm
    url={`/procedures/${id}`}
    type={UPDATE_PROCEDURE_REQUEST}
    initialValues={initialValues}
    extraValues={{oem_business_id}}
    id={initialValues.id}
    procedure_id={id}
    oemBusinessId={oem_business_id}
  />
),[]);

const EditProcedureFormWithStepLoader = withStepLoader(EditProcedureForm);


export default ({match:{params:{oem_id,oem_business_id,id}}}) => {
  const initialValues = useSelector(getProcedureById(id));
  let name = initialValues && initialValues.name;
  const dispatch = useDispatch();
  const addSteps = () => dispatch(loadStepForms(initialValues.steps_order || []));
  useEffect(() => {
    // if(!initialValues || typeof initialValues.description === 'undefined'){
    dispatch({type: FETCH_PROCEDURE_REQUEST, payload: {url: `/procedures/${id}`, id}});
    // }
    if(initialValues && initialValues.steps && initialValues.steps.length > 0){
      addSteps();
    }
    return () => {
      dispatch(resetStepsValues());
    }
  },[]);
  return(<>
    <PageLayout
      header={`Edit ${name ? name : "Procedure"}`}
      back={oem_business_id ? ({
        to: oem_id ? `/clients/${oem_id}/sites/${oem_business_id}` : `/sites/${oem_business_id}`,
        label: "Choose A Different Procedure"
      }) : ({
        to: "/",
        label: "Home"
      })}
      buttons={<ModalTrigger modal="delete_procedure_confirmation"><SubmitButton primary label="Delete Procedure" /></ModalTrigger>}
    >
      <EditProcedureFormWithStepLoader id={id} oem_business_id={oem_business_id} addSteps={addSteps} initialValues={initialValues} />
    </PageLayout>
    <ModalOverlay>
      <DeleteProcedureConfirmationModal procedure_id={id} />
      <DeleteDeviceConfirmationModal procedure_id={id} />
      <DeviceManagerModal name={name} procedure_id={id} />
      <DeleteAllCommentsModal />
      <DeviceCreateModal name={name} procedure_id={id} />
      <ProcedureDeviceModal oem_business_id={oem_business_id} />
      <DeviceUpdateModal name={name} />
      <ProcedureOemBusinessesModal procedure_id={id} oem_id={oem_id} />
      <ImagePreviewModal />
      <VideoPreviewModal />
      <AudioPreviewModal />
      <VideoProgressModal />
      <DocPreviewModal />
      <CommentsListModal />
    </ModalOverlay>
  </>)
}
