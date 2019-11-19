import SubmitButton from '../components/SubmitButton';
import { connect } from 'react-redux';

export default connect(
  ({meta}, {entityKey, id}) => {
    const entityMeta = id ? meta[entityKey][id] : meta[entityKey];
    return({isLoading: entityMeta ? entityMeta.isProcessing : false})
  }
)(SubmitButton);
