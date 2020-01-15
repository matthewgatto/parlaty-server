export const getAllIds = ({businesses}) => businesses.allIds
export const getBusinessMap = ({businesses:{byId}}) => byId
export const getBusinessById = (id) => (state) => getBusinessMap(state)[id]
