import React from 'react';
import PropTypes from 'prop-types';

import s from './Login.css';
import history from 'history';
import jsCookie from 'js-cookie';
import { setSuperUser } from 'actions/superUser';
import { message } from 'antd'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
   }

   static propTypes = {
     title: PropTypes.string.isRequired,
   };

   static contextTypes = {
     fetch: PropTypes.func.isRequired,
     store: PropTypes.object.isRequired,
   }

  async getToken(form) {
    const ret = await this.context.fetch(`/api/v1/login`, {
      credentials: 'include', //pass cookies, for authentication
      body: JSON.stringify(form),
      method: 'POST'
    })
    const result = await ret.json()
    if (!ret.ok) return Promise.reject(result)
    return result
  }

  emailChange(event) {
    this.setState({email: event.target.value});
  }
  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  loginSubmit(event) {
    event.preventDefault()
    this.getToken({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      jsCookie.set("token", res.token)
      this.context.store.dispatch(setSuperUser(res.user))
      history.push('/admin')
    }, (err) => {
      message.error(err.message)
    })
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Admin {this.props.title}</h1>
          <form onSubmit={this.loginSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                Email address:
              </label>
              <input
                className={s.input}
                id="email"
                type="text"
                name="email"
                autoFocus
                value={this.state.email}
                onChange={this.emailChange}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.passwordChange}
              />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login
