import StepAddForm from '../components/StepAddForm';
import { connect } from 'react-redux';

export default connect(
  ({form}) => ({isOpen: form.type === 'create'})
)(StepAddForm)
