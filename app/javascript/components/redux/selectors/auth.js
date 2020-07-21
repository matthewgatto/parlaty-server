export const getUserId = ({auth}) => auth.id
export const isLoggedIn = ({auth}) => auth ? true : false
export const getUser = ({auth}) => auth;
export const getUserRole = ({auth}) => auth && auth.roleable
export const getUserOemBusinesses = ({auth}) => auth && auth.oem_businesses
