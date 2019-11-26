import React from 'react';
import { connect } from 'react-redux';
import BusinessList from '../components/BusinessList';
import ListLabel from '../components/ListLabel';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';
import { fetchEntity } from '../redux/actions';

class OEMBusinesses extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/oems/${this.props.id}/oem_businesses`, "oems", this.props.id);
  }
  renderList = () => {
    if(this.props.isLoading) return <FetchLoader />
    return <BusinessList businesses={this.props.oem.businesses} />
  }
  render(){
    if(this.props.error){
      return <FetchError error={this.props.error} retry={this.makeEntityRequest}/>
    }
    return(
      <>
        <ListLabel
          text="Businesses"
          showRefresh={this.props.oem && !this.props.error}
          refresh={this.makeEntityRequest}
        />
        {this.renderList()}
      </>
    )

  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const oem = entities.oems[id],
          oemState = meta.oems[id];
    return({
      shouldLoad: ((!oem || !oem.businesses) && (!oemState || !oemState.isFetching)),
      error: (oemState && oemState.fetchError) ? oemState.fetchError : undefined,
      isLoading: (!oem || (oemState && oemState.isFetching)),
      oem
    })
  },
  {fetchEntity}
)(OEMBusinesses);
