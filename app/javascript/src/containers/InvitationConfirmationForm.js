import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import InvitationConfirmationForm from '../components/Forms/InvitationConfirmation';
import { handleEntityCreateSubmit, clearForm, setCreateMeta } from '../redux/actions';

class InvitationConfirmationFormContainer extends React.PureComponent {
  initialValues = {id: new Date().getTime(), confirmation_token: queryString.parse(this.props.location.search).confirmation_token}
  componentDidMount(){
    this.props.setCreateMeta(this.initialValues)
  }
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users/confirmation/password', 'invite_confirmation', values, this.initialValues.id, '/')
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <InvitationConfirmationForm
        initialValues={this.initialValues}
        header="SET YOUR PASSWORD"
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm, setCreateMeta}
)(InvitationConfirmationFormContainer);
