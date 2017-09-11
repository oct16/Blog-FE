import React from 'react';
import s from './Footer.css';
import Link from 'components/Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          Copyright © 2017 / Author
          <a href="mailto:mail@fengfan.me" className={s.text}>@oct16</a>
        </div>
      </div>
    )
  }
}

export default Footer
