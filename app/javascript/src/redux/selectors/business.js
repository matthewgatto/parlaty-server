export const getAllIds = ({businesses:{allIds}}) => allIds
export const getBusinessMap = ({businesses:{byIds}}) => byIds
export const getBusinessById = (id) => ({businesses:{byId}}) => byId[id]
export const getBusinessProcedures = (id) => ({businesses:{byId}}) => byId[id] && byId[id].procedures
