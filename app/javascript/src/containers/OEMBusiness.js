import React from 'react';
import { connect } from 'react-redux';
import PageLayout from '../components/PageLayout';
import ListLabel from '../components/ListLabel';
import FetchError from '../components/FetchError';
import OEMBusinessProcedures from './OEMBusinessProcedures';
import { fetchEntity } from '../redux/actions';

class OEMBusinessPage extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/oem_businesses/${this.props.match.params.id}`, "businesses", this.props.match.params.id);
  }
  render(){
    console.log("BUSINESS PROPS", this.props);
    if(this.props.error) return <FetchError error={this.props.error} retry={this.makeEntityRequest}/>
    return(
      <PageLayout
        header={`Business: ${this.props.business.name}`}
        link={this.props.match.params.id ? (
            {text: "Add Procedure", to: `/business/${this.props.match.params.id}/procedures/create`}
          ) : (
            undefined
          )}
        isLoading={this.props.isLoading}
      >
        <OEMBusinessProcedures id={this.props.match.params.id} />
      </PageLayout>
    )

  }
}

export default connect(
  ({entities, meta}, {match: {params: {id}}}) => {
    const business = entities.businesses[id],
          businessState = meta.businesses[id];
    return({
      shouldLoad: ((!business || !business.oem_business_id) && (!businessState || !businessState.isFetching)),
      error: (businessState && businessState.fetchError) ? businessState.fetchError : undefined,
      isLoading: ((!business || !business.oem_business_id) || (businessState && businessState.isFetching)),
      business
    })
  },
  {fetchEntity}
)(OEMBusinessPage);
