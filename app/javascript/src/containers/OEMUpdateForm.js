import React from 'react';
import { connect } from 'react-redux';
import OEMForm from '../components/Forms/OEM';
import { fetchEntity, handleEntityUpdateSubmit, clearForm } from '../redux/actions';

class OEMUpdateFormContainer extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/oems/${this.props.id}`, "oems", this.props.id)
  }
  handleSubmit = values => {
    this.props.handleEntityUpdateSubmit(`/oems/${this.props.id}`, 'oems', this.props.id, values)
  }
  render(){
    if(this.props.isLoading) return <div>Loading...</div>
    return (
      <>
      {this.props.error && <div>{"Unable to load OEM info" || this.props.error}</div>}
      <OEMForm
        initialValues={this.props.initialValues}
        handleSubmit={this.handleSubmit}
        id={this.props.id}
      />
      </>
    )
  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const oem = entities.oems[id],
          oemState = meta.oems[id],
          initialValues = (oem && (oem.name || oem.email))
      ? {name: oem.name, email: oem.email}
      : undefined;
    return({
      shouldLoad: (!initialValues && (!oemState || !oemState.isFetching)),
      error: (oemState && oemState.fetchError) ? oemState.fetchError : undefined,
      isLoading: oemState && oemState.isFetching/**ONCE OEM DATA IMPLEMENTED?** (!initialValues || (oemState && oemState.isFetching))*/,
      initialValues
    })
  },
  {fetchEntity, handleEntityUpdateSubmit}
)(OEMUpdateFormContainer);
