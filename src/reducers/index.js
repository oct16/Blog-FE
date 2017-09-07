import { combineReducers } from 'redux'
import user from './user'
import superUser from './superUser'

const rootReducer = combineReducers({
  user,
  superUser
})

export default rootReducer
