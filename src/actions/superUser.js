import * as types from '../constants/ActionTypes'
import jsCookie from 'js-cookie'
import history from '../history'
export const setSuperUser = (superUser) => (dispatch) => {
  dispatch({
    type: types.SET_SUPER_USER,
    payload: { ...superUser }
  })
}

export const logout = () => (dispatch) => {
  dispatch({
    type: types.SET_SUPER_USER,
    payload: {}
  })

  // clean cookie
  jsCookie.remove("token")
  if (/\/admin/.test(location.pathname)) {
    history.push('/')
  }
}
