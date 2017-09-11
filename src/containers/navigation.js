import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navigation from 'components/Navigation'
import * as superUserAction from 'actions/superUser'

const mapStateToProps = (state) => ({
  logout: state.logout,
  superUser: state.superUser
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(superUserAction, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
