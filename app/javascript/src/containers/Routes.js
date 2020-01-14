import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../components/LoginPage';
import OEMBusinessPage from '../components/Business/Show';
import CreateProcedurePage from '../components/Procedure/Create';
import EditProcedurePage from '../components/Procedure/Edit';
import AdminLandingPage from '../components/AdminLandingPage';
import OEMPage from '../components/OEM/Show';
import OEMLandingPage from '../components/OEM/Landing';
import OEMUpdatePage from '../components/OEM/Edit';
import DeviceListPage from '../components/Device/List';
import DeviceEditPage from '../components/Device/Edit';
import DeviceCreatePage from '../components/Device/Create';
//import BusinessForm from '../components/Business/Create';
import {UserInvitationForm,OEMInvitationForm} from '../components/EmailForms/Invitation';
import ForgotPasswordForm from '../components/EmailForms/ForgotPassword';
import ResetPasswordForm from '../components/EmailForms/ResetPassword';
import InvitationConfirmationForm from '../components/EmailForms/InvitationConfirmation'
//import SignUpPage from './SignUpPage';

export default () => {
  const role = useSelector(({auth}) => auth ? auth.roleable_type : undefined);
  switch (role) {
    case undefined:
      return(<Switch>
        <Route exact path="/" component={LoginPage} />
        {/*<Route path="/register" component={SignUpPage} />*/}
        <Route path="/users/confirmation" component={InvitationConfirmationForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} />
        <Route path="/reset-password/:reset_password_token" component={ResetPasswordForm} />
        <Redirect to="/" />
      </Switch>)
    case "Oem":
      return(<Switch>
        <Route exact path="/" component={OEMLandingPage} />
        <Route path="/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/business/:business_id/procedures/create" component={CreateProcedurePage} />
        {/*<Route path="/business/create" component={BusinessForm} />*/}
        <Route path="/business/:id" component={OEMBusinessPage} />
        <Redirect to="/" />
      </Switch>)
    case "ParlatyAdmin":
      return(<Switch>
        <Route exact path="/" component={AdminLandingPage} />
        <Route path="/invite" component={UserInvitationForm} />
        <Route path="/invite/:roleable" component={OEMInvitationForm} />
        <Route path="/devices/:id/update" component={DeviceEditPage} />
        <Route path="/devices/create" component={DeviceCreatePage} />
        <Route path="/devices" component={DeviceListPage} />
        <Route path="/oem/:oem_id/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/oem/:oem_id/business/:business_id/procedures/create" component={CreateProcedurePage} />
        {/*<Route path="/oem/:oem_id/business/create" component={BusinessForm} />*/}
        <Route path="/oem/:oem_id/business/:id" component={OEMBusinessPage} />
        <Route path="/oem/:id/update" component={OEMUpdatePage} />
        <Route path="/oem/:id" component={OEMPage} />
        <Redirect to="/" />
      </Switch>)
    default:
      return <Route path="/" render={() => <div>Logged in as: {role}</div>} />
  }
}
