import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';
import OEMLandingPage from './OEMLandingPage';
import OEMBusinessPage from '../components/OEMBusinessPage';
import CreateProcedurePage from '../components/CreateProcedurePage';
import EditProcedurePage from '../components/EditProcedurePage';
import AdminLandingPage from '../components/AdminLandingPage';
import OEMPage from '../components/OEMPage';
import OEMUpdatePage from '../components/OEMUpdatePage';
import InvitationForm from './InvitationForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import InvitationConfirmationForm from './InvitationConfirmationForm';
import SignUpPage from './SignUpPage';

class Routes extends React.PureComponent {
  render(){
      if(!this.props.role){
        return(<Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/register" component={SignUpPage} />
          <Route path="/confirmation/:confirmation_token" component={InvitationConfirmationForm} />
          <Route path="/forgot-password" component={ForgotPasswordForm} />
          <Route path="/reset-password/:reset_password_token" component={ResetPasswordForm} />
          <Redirect to="/" />
        </Switch>)
      }
      switch (this.props.role) {
        case "Oem":
          return(<Switch>
            <Route exact path="/" component={OEMLandingPage} />
            <Route exact path="/business/:business_id/procedures/create" component={CreateProcedurePage} />
            <Route exact path="/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
            <Route exact path="/business/:id" component={OEMBusinessPage} />
            <Redirect to="/" />
          </Switch>)
        case "ParlatyAdmin":
          return(<Switch>
            <Route exact path="/" component={AdminLandingPage} />
            <Route exact path="/invite/:roleable" component={InvitationForm} />
            <Route exact path="/oem/:oem_id/business/:business_id/procedures/create" component={CreateProcedurePage} />
            <Route exact path="/oem/:oem_id/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
            <Route exact path="/oem/:oem_id/business/:id" component={OEMBusinessPage} />
            <Route exact path="/oem/:id/update" component={OEMUpdatePage} />
            <Route exact path="/oem/:id" component={OEMPage} />
            <Redirect to="/" />
          </Switch>)
        default:
          return <Route path="/" render={() => <div>Logged in as: {this.props.role}</div>} />

      }
  }
}

export default connect(
  ({user}) => ({role: user.roleable_type})
)(Routes);
