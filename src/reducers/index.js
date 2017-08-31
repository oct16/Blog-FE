import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import superUser from './superUser'

const rootReducer = combineReducers({
  counter,
  user,
  superUser
})

export default rootReducer
