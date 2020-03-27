export const getUserId = ({auth}) => auth.user_id
export const isLoggedIn = ({auth}) => auth ? true : false
export const getUserRole = ({auth}) => auth && auth.roleable_type
