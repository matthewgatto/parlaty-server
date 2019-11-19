import React from 'react';
import { connect } from 'react-redux';
import ProcedureImage from '../components/ProcedureImage';
import { useFormikContext} from 'formik';
import { removeImage } from '../redux/reducers/form';

function ProcedureImageContainer(props){
  const {values: {steps}, setFieldValue} = useFormikContext();
  const remove = () => {
    const idx = steps.findIndex(x => x.id === props.image.id);
    props.removeImage(props.image.id);
    setFieldValue(`steps.${idx}.image`, '');
  }
  return(
    <ProcedureImage image={props.image.src} onClick={remove} />
  )
}

export default connect(
  null,
  {removeImage}
)(ProcedureImageContainer)
