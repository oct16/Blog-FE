import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import comment from 'components/Comment'
import * as userAction from '../actions/user'

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userAction, dispatch)
}

const mergeProps = (stateProps, dispatchProps, parentProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...parentProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(comment)
