import Error from '../components/Error';
import { connect } from 'react-redux';

export default connect(
  ({user}) => ({error: user.error})
)(Error);
