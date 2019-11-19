import React from 'react';
import { connect } from 'react-redux';
import InvitationForm from '../components/InvitationForm';
import { handleEntityCreateSubmit, clearForm } from '../redux/reducers/form';

class InvitationFormContainer extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users', 'invite', values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <InvitationForm
        initialValues={{roleable: this.props.match.params.roleable}}
        header="Send User Invitation"
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm}
)(InvitationFormContainer);
