import React, {useEffect,useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageLayout from '../../PageLayout';
import FetchLoader from '../../List/Loader';
import Name from '../../../containers/Name';
import ProcedureForm from '../Form';
import { UPDATE_PROCEDURE_REQUEST, FETCH_PROCEDURE_REQUEST } from '../../../redux/types/procedure';
import { loadStepForms } from '../../../redux/actions/step';
import { getProcedureById } from '../../../redux/selectors/procedure';
import { getStepMap } from '../../../redux/selectors/step';

const withStepLoader = (WrappedComponent) =>  (
  class extends React.PureComponent {
    componentDidUpdate(prevProps){
      if((!prevProps.initialValues || !prevProps.initialValues.steps) && (this.props.initialValues && this.props.initialValues.steps)){
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
  const addSteps = () => {
    if(initialValues.steps){
      const steps = initialValues.steps,
            visuals = [];
      var count = 0;
      for (var i = 0; i < steps.length; i++) {
        const step = stepMap[steps[i]];
        if(step.visual){
          visuals.push({id: step.id, idx: i, src: step.visual})
        }
      }
      if(steps.length > 0){
        dispatch(loadStepForms(steps,visuals))
      }
    }
  }
  useEffect(() => {
    if(!initialValues || !initialValues.description){
      dispatch({type: FETCH_PROCEDURE_REQUEST, payload: {url: `/procedures/${props.id}`, id: props.id}})
    } else if(initialValues && initialValues.steps){
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
