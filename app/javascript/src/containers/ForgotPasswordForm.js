import React from 'react';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../components/Forms/ForgotPassword';
import { handleEntityCreateSubmit, clearForm } from '../redux/actions';

class ForgotPasswordFormContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users/password', 'forgot_password', values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <ForgotPasswordForm
      initialValues={{email: ''}}
        header="Get A Password Reset Email"
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm}
)(ForgotPasswordFormContainer);
