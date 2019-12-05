import React from 'react';
import { connect } from 'react-redux';
import { fetchEntity } from '../redux/actions';

class OEMName extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.props.fetchEntity(`/oems/${this.props.id}`, "oems");
    }
  }
  render(){
    if(this.props.name) return this.props.name
    return null
  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const oem = entities.oems[id],
          oemState = meta.oems[id];

    return {
      shouldLoad: (!oem.name && (!oemState || !oemState.isFetching)),
      error: (oemState && oemState.fetchError) ? oemState.fetchError : undefined,
      name: oem && oem.name
    }
  },
  {fetchEntity}
)(OEMName);
