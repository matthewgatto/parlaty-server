import { connect } from 'react-redux';
import Button from '../components/Button';
import { createProcedure } from '../store/procedure';

export default connect(
  ({procedure}) => ({isLoading: procedure.isLoading}),
  { onClick: createProcedure }
)(Button)
