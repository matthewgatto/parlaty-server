import { connect } from 'react-redux';
import FormCloseButton from '../components/FormCloseButton';
import { closeForm } from '../store/form';

export default connect(
  null,
  { closeForm }
)(FormCloseButton);
