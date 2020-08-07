import * as message from '@types/message'

export default (state = {}, {type, payload}) =>{
  switch (type) {
    case message.FETCH_MESSAGE_REQUEST__SUCCESS:
      if(payload.message){
        const k = {
          ...state,
          ...payload.message
        };
        console.log(k);
        return k;
      }
      return state;
    default:
      return state;
  }
}
