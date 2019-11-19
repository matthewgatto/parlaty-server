import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OEMList from '../components/OEMList';
import ListLabel from '../components/ListLabel';
import { fetchEntity } from '../redux/reducers/entities';

class OEMListContainer extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity('/oems', "landing");
  }
  renderList = () => {
    if(this.props.error) return(
      <div>
        <div>{this.props.error}</div>
        <div>(Not implemented - here is a link to <Link to="/oem/1">OEM 1</Link>)</div>
      </div>
    )
    if(this.props.isLoading) return <div>Loading...</div>
    return <OEMList oems={this.props.landing.oems} />
  }
  render(){
    return(
      <>
        <ListLabel
          text="OEMs"
          showRefresh={this.props.landing.oems && !this.props.error}
          refresh={this.makeEntityRequest}
        />
        {this.renderList()}
      </>
    )

  }
}

export default connect(
  ({entities, meta}) => {
    const landing = entities.landing,
          landingState = meta.landing;
    return({
      shouldLoad: (!landing.oems && (!landingState || !landingState.isFetching)),
      error: (landingState && landingState.fetchError) ? landingState.fetchError : undefined,
      isLoading: (!landing || (landingState && landingState.isFetching)),
      landing
    })
  },
  {fetchEntity}
)(OEMListContainer);
