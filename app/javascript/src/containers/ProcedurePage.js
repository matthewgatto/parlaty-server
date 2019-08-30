import React from 'react';
import { connect } from 'react-redux';
import ProcedurePage from '../components/ProcedurePage';

class ProcedurePageContainer extends React.PureComponent {
  componentDidMount(){
    this.userCheck();
  }
  componentDidUpdate(){
    this.userCheck();
  }
  userCheck = () => {
    if(!this.props.loggedIn){
      this.props.history.push('/login')
    }
  }
  render(){
    return(
      <ProcedurePage />
    )
  }
}

export default connect(
  ({user}) => ({loggedIn: user.jwt ? true : false})
)(ProcedurePageContainer);
