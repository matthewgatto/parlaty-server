import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login } from '../store/user';

class LoginFormContainer extends React.Component {
  state = {}
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.props.isLoading){
      this.props.login({email: this.state.email, password: this.state.password})
    }
  }
  handleInputChange = ({target}) => this.setState({[target.name]: target.value})
  render(){
    return(
      <LoginForm isLoading={this.props.isLoading} error={this.props.error} onSubmit={this.handleSubmit} onChange={this.handleInputChange} email={this.state.email} password={this.state.password} />
    )
  }
}

export default connect(
  ({user}) => ({error: user.error, isLoading: user.isLoading}),
  { login }
)(LoginFormContainer);
