import { connect } from 'react-redux';
import StepFields from '../components/StepFields';

export default connect(
  ({form}, {idx}) => ({isOpen: (form.step && form.step.idx === idx) ? true : false})
)(StepFields)
