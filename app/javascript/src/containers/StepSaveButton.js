import { connect } from 'react-redux';
import ActionWell from '../components/ActionWell';
import { saveStep } from '../store/procedure';

export default connect(
  null,
  { onClick: saveStep }
)(ActionWell)
