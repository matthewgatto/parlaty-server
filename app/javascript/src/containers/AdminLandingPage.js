import React from 'react';
import { connect } from 'react-redux';
import AdminLandingPage from '../components/AdminLandingPage';
import { fetchEntity } from '../redux/reducers/entities';

class AdminLandingPageContainer extends React.PureComponent {
  componentDidMount(){
    if(!this.props.oems && (!this.props.meta || !this.props.meta.isFetching)){
      this.props.fetchEntity('/oems', "landing");
    }
  }
  render(){
    return <AdminLandingPage oems={this.props.oems} isLoading={this.props.meta && this.props.meta.isFetching} error={this.props.meta && this.props.meta.fetchError}  />
  }
}

export default connect(
  ({entities, meta}) => ({oems: entities.landing.oems, meta: meta.landing}),
  {fetchEntity}
)(AdminLandingPageContainer)
