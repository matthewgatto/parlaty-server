export const getCommentsList = (id) => (state) => state.steps.byId[id].comments;
export const getCommentById = (id) => ({comments}) => comments.byId[id];