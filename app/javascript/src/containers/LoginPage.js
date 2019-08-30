import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';

class LoginPageContainer extends React.PureComponent {
  componentDidMount(){
    this.userCheck();
  }
  componentDidUpdate(){
    this.userCheck();
  }
  userCheck = () => {
    if(this.props.loggedIn){
      this.props.history.push('/');
    }
  }
  render(){
    return(
      <LoginPage />
    )
  }
}

export default connect(
  ({user}) => ({loggedIn: user.jwt ? true : false})
)(LoginPageContainer);
