import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          Copyright © 2017 / Author
          <a href="mailto:mail@fengfan.me" className={s.text}>@oct16</a>
          {/* <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">Home</Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/about">About</Link> */}

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
