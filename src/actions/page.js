import * as types from '../constants/ActionTypes'

export const getUserStatus = () => (dispatch) => {
  dispatch({
    type: types.GET_USER_STATUS
  })
}
