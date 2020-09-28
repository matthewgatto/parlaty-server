export const getCommentsList = (id) => ({steps}) => {
  // debugger;
  return steps.byId[id].comments || [
    {
      id: 1,
      author: 'john smith',
      created_at: '09/24/2020 15:32',
      text: 'unsure how to properly turn the vehicle off',
      readed: false,
    },
    {
      id: 2,
      author: 'john2 smith',
      created_at: '09/24/2020 16:31',
      text: '2222 unsure how to properly turn the vehicle off',
      readed: false,
    },
    {
      id: 3,
      author: 'john3 smith',
      created_at: '09/24/2020 17:33',
      text: '3333 unsure how to properly turn the vehicle off',
      readed: false,
    }
  ];
}
export const getCommentById = (id) => ({comments}) => comments.byId[id];