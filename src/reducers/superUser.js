import { SET_SUPER_USER } from 'constants/ActionTypes'

const initialState = {
  superUser: {}
}

const superUser = (state = initialState.superUser, action) => {
  switch (action.type) {
    case SET_SUPER_USER:
      return action.payload
    default:
      return state
  }
}

export default superUser
