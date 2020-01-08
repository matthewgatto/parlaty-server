import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../components/LoginPage';
import OEMBusinessPage from '../components/OEMBusinessPage';
import CreateProcedurePage from '../components/CreateProcedurePage';
import EditProcedurePage from '../components/EditProcedurePage';
import AdminLandingPage from '../components/AdminLandingPage';
import OEMPage from '../components/OEMPage';
import OEMUpdatePage from '../components/OEMUpdatePage';
import OEMInvitationForm from '../components/Forms/Invitation';
import DeviceListPage from '../components/DeviceListPage';
import DeviceEditPage from '../components/DeviceEditPage';
import DeviceCreatePage from '../components/DeviceCreatePage';
import UserInvitationForm from '../components/Forms/UserInvitation';
import BusinessForm from '../components/Forms/Business';
import ForgotPasswordForm from '../components/Forms/ForgotPassword';
import ResetPasswordForm from '../components/Forms/ResetPassword';
import InvitationConfirmationForm from '../components/Forms/InvitationConfirmation'
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
        <Route exact path="/" component={OEMPage} />
        <Route path="/business/:business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/business/:business_id/procedures/create" component={CreateProcedurePage} />
        <Route path="/business/create" component={BusinessForm} />
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
        <Route path="/oem/:oem_id/business/create" component={BusinessForm} />
        <Route path="/oem/:oem_id/business/:id" component={OEMBusinessPage} />
        <Route path="/oem/:id/update" component={OEMUpdatePage} />
        <Route path="/oem/:id" component={OEMPage} />
        <Redirect to="/" />
      </Switch>)
    default:
      return <Route path="/" render={() => <div>Logged in as: {role}</div>} />
  }
}
