import React from 'react';
import { connect } from 'react-redux';
import SignUpPage from '../components/SignUpPage';

class SignUpPageContainer extends React.PureComponent {
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
      <SignUpPage />
    )
  }
}

export default connect(
  ({user}) => ({loggedIn: user.jwt ? true : false})
)(SignUpPageContainer);
