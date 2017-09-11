import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './Navigation.css';
import Link from 'components/Link';
import jsCookie from 'js-cookie'
import history from 'history';

class Navigation extends React.Component {

  static propTypes = {
    superUser: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { superUser, logout } = this.props;

    let superUserStatus = {}
    if (Object.keys(superUser).length) {
      superUserStatus = <span>
        {/* <a className={s.link} type="email">{superUser.email}</a> */}
        <Link className={s.link} to="/admin">Admin</Link>
        <a className={s.link} onClick={logout}>Log Out</a>
      </span>
    } else {
      superUserStatus = <Link className={s.link} to="/login">Log in</Link>
    }

    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">About</Link>
        {/* <Link className={s.link} to="/test">Test</Link> */}
        { /*<span className={s.spacer}> | </span> */}
        {superUserStatus}
      </div>
    )
  }
}

export default Navigation
