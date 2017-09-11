import * as types from 'constants/ActionTypes'
import jsCookie from 'js-cookie'
import history from 'history'
export const setUser = (user) => (dispatch) => {
  dispatch({
    type: types.SET_USER,
    payload: { ...user }
  })
}
