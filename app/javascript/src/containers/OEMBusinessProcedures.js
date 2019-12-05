import { connect } from 'react-redux';
import List from './List';

export default connect(
  ({entities, meta}, {id}) => {
    const business = entities.businesses[id],
          businessState = meta.businesses[id];
    return({
      shouldLoad: (!business || !business.procedures && (!businessState || !businessState.isFetching)),
      error: (businessState && businessState.fetchError) ? businessState.fetchError : undefined,
      isLoading: (!business || (businessState && businessState.isFetching)),
      items: business ? business.procedures : undefined
    })
  }
)(List);
