import { connect } from 'react-redux';

import Error from '../components/Error';

export default connect(
  ({meta}, {entityKey, id}) => {
    const formState = meta[entityKey][id];
    if(formState && formState.formError){
      return({error: formState.formError})
    }
    return{}
  }
)(Error);
