import React from 'react';
import { connect } from 'react-redux';
import InvitationForm from '../components/Forms/Invitation';
import { handleEntityCreateSubmit, clearForm, setCreateMeta } from '../redux/actions';

class InvitationFormContainer extends React.PureComponent {
  initialValues = {id: new Date().getTime(), roleable: this.props.match.params.roleable}
  componentDidMount(){
    this.props.setCreateMeta(this.initialValues)
  }
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/users', 'invite', values, '/')
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <InvitationForm
        initialValues={this.initialValues}
        header="Send User Invitation"
        handleSubmit={this.handleSubmit}
        back={this.props.history.goBack}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm, setCreateMeta}
)(InvitationFormContainer);
