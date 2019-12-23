import { connect } from 'react-redux';
import Error from '../components/Error';

export default connect(
  ({form: {step}}) => ({error: step.error})
)(Error);
