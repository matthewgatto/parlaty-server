export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST__SUCCESS = "LOGIN_REQUEST__SUCCESS";
export const LOGIN_REQUEST__FAILURE = "LOGIN_REQUEST__FAILURE";

export const login = (values) => ({type: LOGIN_REQUEST, payload: values});

const initialState = {};
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case LOGIN_REQUEST:
      return {isLoading: true}
    case LOGIN_REQUEST__SUCCESS:
      return payload;
      break;
    case LOGIN_REQUEST__FAILURE:
      return {error: payload};
      break;
    default:
      return previousState;
  }
}
