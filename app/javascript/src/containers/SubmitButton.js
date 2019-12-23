import SubmitButton from '../components/SubmitButton';
import { connect } from 'react-redux';

export default connect(
  ({user}) => {
    return({isLoading: user.isLoading})
  }
)(SubmitButton);
