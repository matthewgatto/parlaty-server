import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@actions/auth';
import Layout from '@components/Layout';
import LoginPage from '@components/LoginPage';
import OemBusinessPage from '@components/OemBusiness/Show';
//import CreateProcedurePage from '@components/Procedure/Create';
import EditProcedurePage from '@components/Procedure/Edit';
import CreateProcedureScreen from '@components/Procedure/CreateProcedureScreen';
import AddDevicesScreen from '@components/Procedure/AddDevicesScreen';
import AddStepsScreen from '@components/Procedure/AddStepsScreen';
import ClientUserLandingPage from '@components/ClientUserLandingPage';
import AdminLandingPage from '@components/AdminLandingPage';
import OemPage from '@components/Oem/Show';
import CreateClientForm from '@components/Oem/Create';
import OemLandingPage from '@components/Oem/Landing';
import OemUpdatePage from '@components/Oem/Edit';
import DeviceAdminPage from '@components/Device/Tab/Admin';
import DeviceOemAdminPage from '@components/Device/Tab/Oem/Admin';
import DeviceOemLandingPage from '@components/Device/Tab/Oem/Landing';
import DeviceBusinessPage from '@components/Device/Tab/OemBusiness';
import DeviceManagerPage from '@components/Device/Tab/Manager';
import BusinessForm from '@components/OemBusiness/Create';
import ForgotPasswordForm from '@components/EmailForms/ForgotPassword';
import ResetPasswordForm from '@components/EmailForms/ResetPassword';
import InvitationConfirmationForm from '@components/EmailForms/InvitationConfirmation'
//import SignUpPage from '@components/SignUpPage';
import UserInvite from '@components/User/Invite';
import UserUpdatePage from '@components/User/Update';
import UsersPage from '@components/UsersPage';
import useUserInfo from '@containers/useUserInfo';

const Routes = ({role}) => {
  switch (role) {
    case "ParlatyAdmin":
      return(<Switch>
        <Route exact path="/" component={AdminLandingPage} />
        <Route path="/users/invite" render={() => <UserInvite role={role} />} />
        <Route path="/users/:id" render={({match}) => <UserUpdatePage role={role} match={match} />} />
        <Route path="/users" component={UsersPage} />
        <Route exact path="/clients/:oem_id/sites/:oem_business_id/procedures/:id/update" component={EditProcedurePage} />
        {/*<Route path="/clients/:oem_id/sites/:oem_business_id/procedures/create" component={CreateProcedurePage} />*/}
        <Route exact path="/clients/:oem_id/sites/:oem_business_id/procedures/:id/add-devices" component={AddDevicesScreen} />
        <Route exact path="/clients/:oem_id/sites/:oem_business_id/procedures/:id/add-steps" component={AddStepsScreen} />
        <Route path="/clients/:oem_id/sites/:oem_business_id/procedures/create" component={CreateProcedureScreen} />
        {/*
        <Route path="/devices/:oem_id/:oem_business_id/:procedure_id" component={DeviceManagerPage} />
        <Route path="/devices/:oem_id/:oem_business_id" component={DeviceBusinessPage} />
        <Route path="/devices/:oem_id" component={DeviceOemAdminPage} />
        <Route path="/devices" component={DeviceAdminPage} />
        */}
        <Route path="/clients/:oem_id/sites/create" component={BusinessForm} />
        <Route path="/clients/:oem_id/sites/:id" render={OemBusinessPage} />
        <Route path="/clients/:oem_id/edit" component={OemUpdatePage} />
        <Route path="/clients/create" component={CreateClientForm} />
        <Route path="/clients/:oem_id" component={OemPage} />
        <Redirect to="/" />
      </Switch>)
    case "ClientAdmin":
      return(<Switch>
        <Route exact path="/" component={ClientUserLandingPage} />
        <Route path="/clients/:oem_id/edit" component={OemUpdatePage} />
        <Route path="/users/invite" render={() => <UserInvite role={role} />} />
        <Route path="/users/:id" render={({match}) => <UserUpdatePage role={role} match={match} />} />
        <Route path="/users" component={UsersPage} />
        <Route exact path="/sites/:oem_business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route exact path="/sites/:oem_business_id/procedures/:id/add-devices" component={AddDevicesScreen} />
        <Route exact path="/sites/:oem_business_id/procedures/:id/add-steps" component={AddStepsScreen} />
        <Route path="/sites/:oem_business_id/procedures/create" component={CreateProcedureScreen} />
        <Route path="/sites/create" component={BusinessForm} />
        <Route path="/sites/:id" component={OemBusinessPage} />
        <Redirect to="/" />
      </Switch>)
    case "Operator":
      return (<Switch>
        <Route exact path="/" component={ClientUserLandingPage} />
        <Route render={() => <div>Operator Page Does Not Exist</div>} />
      </Switch>)
    case "Author":
      return(<Switch>
        <Route exact path="/" component={ClientUserLandingPage} />
        <Route path="/sites/:oem_business_id/procedures/:id/update" component={EditProcedurePage} />
        <Route path="/sites/:oem_business_id/procedures/:id/add-devices" component={AddDevicesScreen} />
        <Route path="/sites/:oem_business_id/procedures/:id/add-steps" component={AddStepsScreen} />
        <Route path="/sites/:oem_business_id/procedures/create" component={CreateProcedureScreen} />
        <Route path="/sites/:id" component={OemBusinessPage} />
      </Switch>)
    default:
      return(<Switch>
        <Route exact path="/" component={LoginPage} />
        {/*<Route path="/register" component={SignUpPage} />*/}
        <Route path="/users/confirmation" component={InvitationConfirmationForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} />
        <Route path="/reset-password" component={ResetPasswordForm} />
        <Redirect to="/" />
      </Switch>)
  }
}

export default () => {
  const user = useUserInfo();
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout())
  return(
    <Layout role={user && user.roleable} logout={handleLogout}>
      <Routes role={user && user.roleable} />
    </Layout>
  )
}
