import React from 'react';
import PropTypes from 'prop-types';
import history from 'history';
import config from 'config';
import s from './link.css';
import cs from 'classnames'

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

class Link extends React.Component {

  constructor () {
    super()
    this.state = {
      isActive: ''
    }
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: null,
  }

  componentWillMount() {
    this.updateCurrentUrl()
    if (global.window){
      this.unlisten = history.listen((location, action) => {
        this.updateCurrentUrl()
      })
    }
  }

  componentWillUnmount() {
    if (global.window){
      this.unlisten()
    }
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault()
    let to = this.props.to
    history.push(to)
  }

  updateCurrentUrl = (currentUrl = global.R.url)  => {
    if (currentUrl) {
      if (this.props.to === currentUrl) {
        this.setState({isActive: ' active'})
        return
      }
    }
    this.setState({isActive: ''})
    return
  }

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
    return <a href={this.wrapLinkPath(to)} {...props}
      className={cs(props.className, this.state.isActive ? s.active : '' )}
      onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
