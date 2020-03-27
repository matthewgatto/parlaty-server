import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@actions/auth';
import Layout from '@components/Layout';
import LoginPage from '@components/LoginPage';
import OEMBusinessPage from '@components/Business/Show';
//import CreateProcedurePage from '@components/Procedure/Create';
import EditProcedurePage from '@components/Procedure/Edit';
import CreateProcedureScreen from '@components/Procedure/CreateProcedureScreen';
import AddDevicesScreen from '@components/Procedure/AddDevicesScreen';
import AddStepsScreen from '@components/Procedure/AddStepsScreen';
import AdminLandingPage from '@components/AdminLandingPage';
import OEMPage from '@components/OEM/Show';
import OEMLandingPage from '@components/OEM/Landing';
import OEMUpdatePage from '@components/OEM/Edit';
import DeviceAdminPage from '@components/Device/Tab/Admin';
import DeviceOEMAdminPage from '@components/Device/Tab/OEM/Admin';
import DeviceOEMLandingPage from '@components/Device/Tab/OEM/Landing';
import DeviceBusinessPage from '@components/Device/Tab/Business';
import DeviceManagerPage from '@components/Device/Tab/Manager';
//import BusinessForm from '@components/Business/Create';
import {UserInvitationForm,OEMInvitationForm} from '@components/EmailForms/Invitation';
import ForgotPasswordForm from '@components/EmailForms/ForgotPassword';
import ResetPasswordForm from '@components/EmailForms/ResetPassword';
import InvitationConfirmationForm from '@components/EmailForms/InvitationConfirmation'
//import SignUpPage from '@components/SignUpPage';
import {getUserRole} from '@selectors/auth';

const Routes = ({role}) => {
  switch (role) {
    case "Oem":
      return(<Switch>
        <Route exact path="/" component={OEMLandingPage} />
        <Route exact path="/businesses/:business_id/procedures/:id/update" component={EditProcedurePage} />
        {/*<Route path="/businesses/:business_id/procedures/create" component={CreateProcedurePage} />*/}
        <Route exact path="/businesses/:business_id/procedures/:id/add-devices" component={AddDevicesScreen} />
        <Route exact path="/businesses/:business_id/procedures/:id/add-steps" component={AddStepsScreen} />
        <Route path="/businesses/:business_id/procedures/create" component={CreateProcedureScreen} />
        {/*<Route path="/businesses/create" component={BusinessForm} />*/}
        <Route path="/businesses/:id" component={OEMBusinessPage} />
        <Route path="/devices/:business_id/:procedure_id" component={DeviceManagerPage} />
        <Route path="/devices/:business_id" component={DeviceBusinessPage} />
        <Route path="/devices" component={DeviceOEMLandingPage} />
        <Redirect to="/" />
      </Switch>)
    case "ParlatyAdmin":
      return(<Switch>
        <Route exact path="/" component={AdminLandingPage} />
        <Route path="/invite" component={UserInvitationForm} />
        <Route path="/invite/:roleable" component={OEMInvitationForm} />
        <Route exact path="/oems/:oem_id/businesses/:business_id/procedures/:id/update" component={EditProcedurePage} />
        {/*<Route path="/oems/:oem_id/businesses/:business_id/procedures/create" component={CreateProcedurePage} />*/}
        <Route exact path="/oems/:oem_id/businesses/:business_id/procedures/:id/add-devices" component={AddDevicesScreen} />
        <Route exact path="/oems/:oem_id/businesses/:business_id/procedures/:id/add-steps" component={AddStepsScreen} />
        <Route path="/oems/:oem_id/businesses/:business_id/procedures/create" component={CreateProcedureScreen} />
        <Route path="/devices/:oem_id/:business_id/:procedure_id" component={DeviceManagerPage} />
        <Route path="/devices/:oem_id/:business_id" component={DeviceBusinessPage} />
        <Route path="/devices/:oem_id" component={DeviceOEMAdminPage} />
        <Route path="/devices" component={DeviceAdminPage} />
        {/*<Route path="/oems/:oem_id/businesses/create" component={BusinessForm} />*/}
        <Route path="/oems/:oem_id/businesses/:id" render={OEMBusinessPage} />
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

export default () => {
  const role = useSelector(getUserRole);
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout())
  return(
    <Layout role={role} logout={handleLogout}>
      <Routes role={role} />
    </Layout>
  )
}
