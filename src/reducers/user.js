import { SET_USER } from 'constants/ActionTypes'

const initialState = {
  user: {}
}

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}

export default user
