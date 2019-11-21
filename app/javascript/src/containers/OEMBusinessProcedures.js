import React from 'react';
import { connect } from 'react-redux';
import ProcedureList from '../components/ProcedureList';
import ListLabel from '../components/ListLabel';
import { fetchEntity } from '../redux/actions';

class OEMBusinessProcedures extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/oem_businesses/${this.props.id}/procedures`, "businesses", this.props.id);
  }
  renderList = () => {
    if(this.props.error) return <div>{this.props.error}</div>
    if(this.props.isLoading) return <div>Loading...</div>
    return <ProcedureList business_id={this.props.id} procedures={this.props.business.procedures} />
  }
  render(){
    return(
      <>
        <ListLabel
          text="Procedures"
          showRefresh={this.props.business && !this.props.error}
          refresh={this.makeEntityRequest}
        />
        {this.renderList()}
      </>
    )
  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const business = entities.businesses[id],
          businessState = meta.businesses[id];
    return({
      shouldLoad: (!business && (!businessState || !businessState.isFetching)),
      error: (businessState && businessState.fetchError) ? businessState.fetchError : undefined,
      isLoading: (!business || (businessState && businessState.isFetching)),
      business
    })
  },
  {fetchEntity}
)(OEMBusinessProcedures);
