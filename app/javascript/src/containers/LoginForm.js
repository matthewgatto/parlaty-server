import { connect } from 'react-redux';
import LoginForm from '../components/Forms/Login';
import { handleLoginSubmit } from '../redux/actions';

export default connect(
  null,
  { handleLoginSubmit }
)(LoginForm);
