import React from 'react';
import { connect } from 'react-redux';
import InvitationConfirmationForm from '../components/Forms/InvitationConfirmation';
import { handleEntityCreateSubmit, clearForm } from '../redux/actions';

class InvitationConfirmationFormContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users/confirmation/password', 'invite_confirmation', values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <InvitationConfirmationForm
        initialValues={{confirmation_token: this.props.match.params.confirmation_token}}
        header="SET YOUR PASSWORD"
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm}
)(InvitationConfirmationFormContainer);
