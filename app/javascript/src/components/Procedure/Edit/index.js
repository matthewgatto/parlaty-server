import React, {useEffect,useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '@components/PageLayout';
import FetchLoader from '@components/List/Loader';
import Name from '@containers/Name';
import ProcedureForm from '../Form';
import { UPDATE_PROCEDURE_REQUEST, FETCH_PROCEDURE_REQUEST } from '@types/procedure';
import { loadStepForms } from '@actions/step';
import { getProcedureById } from '@selectors/procedure';
import { getStepMap } from '@selectors/step';

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
  />
),[])

const EditProcedureFormWithStepLoader = withStepLoader(EditProcedureForm);

const EditProcedureFormContainer = (props) => {
  const initialValues = useSelector(getProcedureById(props.id));
  const stepMap = useSelector(getStepMap)
  const dispatch = useDispatch();
  const addSteps = () => dispatch(loadStepForms(initialValues.steps))
  useEffect(() => {
    if(!initialValues || !initialValues.description){
      dispatch({type: FETCH_PROCEDURE_REQUEST, payload: {url: `/procedures/${props.id}`, id: props.id}})
    } else if(initialValues && initialValues.steps && initialValues.steps.length > 0){
      addSteps();
    }
  },[])
  return <EditProcedureFormWithStepLoader addSteps={addSteps} initialValues={initialValues} {...props} />
}

export default ({match:{params:{oem_id,business_id,id}}}) => (
  <PageLayout
    header="Edit Procedure"
    back={business_id ? ({
      to: oem_id ? `/oems/${oem_id}/businesses/${business_id}` : `/businesses/${business_id}`,
      label: <Name entityKey="businesses" id={business_id} />
      }) : ({
        to: "/",
        label: "Home"
      })}
  >
    <EditProcedureFormContainer id={id} oem_business_id={business_id} />
  </PageLayout>
)
