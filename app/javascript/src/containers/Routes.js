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
import {getUserRole} from '../redux/selectors/auth';

export default () => {
  const role = useSelector(getUserRole);
  switch (role) {
    case "Oem":
      return(<Switch>
        <Route exact path="/" component={OEMLandingPage} />
        <Route path="/businesses/:business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/businesses/:business_id/procedures/create" component={CreateProcedurePage} />
        {/*<Route path="/businesses/create" component={BusinessForm} />*/}
        <Route path="/businesses/:id" component={OEMBusinessPage} />
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
        <Route path="/oems/:oem_id/businesses/:business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/oems/:oem_id/businesses/:business_id/procedures/create" component={CreateProcedurePage} />
        {/*<Route path="/oems/:oem_id/businesses/create" component={BusinessForm} />*/}
        <Route path="/oems/:oem_id/businesses/:id" component={OEMBusinessPage} />
        <Route path="/oems/:id/update" component={OEMUpdatePage} />
        <Route path="/oems/:id" component={OEMPage} />
        <Redirect to="/" />
      </Switch>)
    default:
      return(<Switch>
        <Route exact path="/" component={LoginPage} />
        {/*<Route path="/register" component={SignUpPage} />*/}
        <Route path="/users/confirmation" component={InvitationConfirmationForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} />
        <Route path="/reset-password/:reset_password_token" component={ResetPasswordForm} />
        <Redirect to="/" />
      </Switch>)
  }
}
