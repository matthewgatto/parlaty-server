import { connect } from 'react-redux';
import ActionWell from '../components/ActionWell';
import { addStep } from '../store/procedure';

export default connect(
  null,
  { onClick: addStep }
)(ActionWell)
