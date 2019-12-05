import { connect } from 'react-redux';
import List from './List';

export default connect(
  ({entities, meta}) => {
    const landing = entities.landing,
          landingState = meta.landing;
    return({
      shouldLoad: (!landing.oem_list && (!landingState || !landingState.isFetching)),
      error: (landingState && landingState.fetchError) ? landingState.fetchError : undefined,
      isLoading: (!landing || (landingState && landingState.isFetching)),
      items: landing ? landing.oem_list : undefined
    })
  }
)(List);
