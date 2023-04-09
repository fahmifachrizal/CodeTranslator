const initialState = {
  APIkey:''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'user/changeAPIkey':
      return {
        ...state,
        APIkey: action.payload.APIkey
      }
    default:
      return state
  }
}

export default userReducer