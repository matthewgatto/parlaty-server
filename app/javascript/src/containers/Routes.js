import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';
import OEMLandingPage from './OEMLandingPage';
import OEMBusinessPage from '../components/OEMBusinessPage';
import NewProcedurePage from './NewProcedurePage';
import EditProcedurePage from './EditProcedurePage';
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
      switch (this.props.role.toLowerCase()) {
        case "oem":
          return(<Switch>
            <Route exact path="/" component={OEMLandingPage} />
            <Route exact path="/business/:business_id/procedures/create" component={NewProcedurePage} />
            <Route exact path="/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
            <Route exact path="/business/:id" component={OEMBusinessPage} />
          </Switch>)
        case "parlatyadmin":
          return(<Switch>
            <Route exact path="/" component={AdminLandingPage} />
            <Route exact path="/invite/:roleable" component={InvitationForm} />
            <Route exact path="/oem/:id/update" component={OEMUpdatePage} />
            <Route exact path="/oem/:id" component={OEMPage} />
            <Route exact path="/business/:business_id/procedures/create" component={NewProcedurePage} />
            <Route exact path="/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
            <Route exact path="/business/:id" component={OEMBusinessPage} />
          </Switch>)
        default:
          return <Route path="/" render={() => <div>Logged in as: {this.props.role}</div>} />

      }
  }
}

export default connect(
  ({user}) => ({role: user.roleable_type})
)(Routes);
