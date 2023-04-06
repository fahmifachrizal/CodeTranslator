import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import uxReducer from './reducers/uxReducer'
const allReducers = combineReducers({
  uxReducer,
})

const store = createStore(allReducers, applyMiddleware(thunk))

export default store