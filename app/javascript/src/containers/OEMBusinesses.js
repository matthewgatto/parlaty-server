import { connect } from 'react-redux';
import List from './List';

export default connect(
  ({entities, meta}, {id}) => {
    const oem = entities.oems[id],
          oemState = meta.oems[id];
    return({
      shouldLoad: ((!oem || !oem.businesses) && (!oemState || !oemState.isFetching)),
      error: (oemState && oemState.fetchError) ? oemState.fetchError : undefined,
      isLoading: (!oem || (oemState && oemState.isFetching)),
      items: oem ? oem.businesses : undefined
    })
  }
)(List);
