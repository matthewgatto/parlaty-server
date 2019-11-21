import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

function Logout({logout, isLoggedIn, ...props}){
  if(isLoggedIn) return <span onClick={logout} {...props}>Logout</span>
  return null
}
export default connect(
  ({user}) => ({isLoggedIn: user.jwt ? true : false}),
  {logout}
)(Logout)
