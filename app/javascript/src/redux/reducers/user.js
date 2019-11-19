export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST__SUCCESS = "LOGIN_REQUEST__SUCCESS";
export const LOGIN_REQUEST__FAILURE = "LOGIN_REQUEST__FAILURE";
export const LOGOUT = "LOGOUT";

export const handleLoginSubmit = values => ({type: LOGIN_REQUEST, payload: values});
export const login = (user) => ({type: LOGIN_REQUEST__SUCCESS, payload: user});
export const logout = () => ({type: LOGOUT})

const initialState = {};
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case LOGIN_REQUEST:
      console.log(type, payload);
      return {
        ...previousState,
        isLoading: true
      }
    case LOGIN_REQUEST__SUCCESS:
      return payload;
    case LOGIN_REQUEST__FAILURE:
      return {
        ...previousState,
        error: payload,
        isLoading: false
      };
    case LOGOUT:
      return initialState
    default:
      return previousState;
  }
}
