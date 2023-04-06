const initialState = {
  homeState: 'nearby',
  activeMenu: '',
  posts: [],
  searchResult: [],
}

const uxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ux/changeHomeState':
      return {
        ...state,
        homeState: action.payload.homeState
      }
      case 'ux/changeMenu':
        return {
          ...state,
          activeMenu: action.payload.activeMenu
        }
      case 'ux/getPost':
        return {
          ...state,
          posts: action.payload.posts
        }
      case 'ux/getSearchPost':
        return {
          ...state,
          searchResult: action.payload.searchResult
        }
    default:
      return state
  }
}

export default uxReducer