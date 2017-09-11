import React from 'react';
import PropTypes from 'prop-types';
import history from 'history';
import config from 'config';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    let to = this.props.to
    history.push(to);
  };

  wrapLinkPath = (path) => {
    const rootPath = config.rootPath
    const reg = new RegExp('^' + rootPath)
    if (!reg.test(path)) {
      path = rootPath + path
    }
    return path
  }

  render() {
    let { to, children, ...props } = this.props;
    return <a href={this.wrapLinkPath(to)} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
