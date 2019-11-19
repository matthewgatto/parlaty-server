import { connect } from 'react-redux';
import OEMPage from '../components/OEMPage';

export default connect(
  ({user}) => ({id: user.roleable_id})
)(OEMPage)
