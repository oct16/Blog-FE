import React from 'react';
import s from './index.css';
import Link from 'components/Link';
import PropTypes from 'prop-types'

class Content extends React.Component {

  static propTypes = {
    content: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className={s.content}>
        {this.props.content}
      </div>
    )
  }
}

export default Content
