import { connect } from 'react-redux';
import Button from '../components/Button';
import { createProcedure } from '../store/procedure';

export default connect(
  null,
  { onClick: createProcedure }
)(Button)
