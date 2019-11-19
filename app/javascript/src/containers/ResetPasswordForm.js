import React from 'react';
import { connect } from 'react-redux';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { handleEntityCreateSubmit, clearForm } from '../redux/reducers/form';

class ResetPasswordFormContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users/password', 'reset_password', values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <ResetPasswordForm
        initialValues={{reset_password_token: this.props.match.params.reset_password_token}}
        header="SET YOUR PASSWORD"
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm}
)(ResetPasswordFormContainer);
