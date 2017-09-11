import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, message } from 'antd'

import CSSTransition from 'react-transition-group/CSSTransition';

const Fade = ({ children, ...props }) => (
<CSSTransition
  {...props}
  timeout={500}
  classNames="fade">
  {children}
</CSSTransition>
)

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      show: false
    }
  }

  componentDidMount () {

  }

  transitionClick = () => () => {
    this.setState({ show: !this.state.show })
  }

  handleChange = () => (d) => {
    d = d || ''
    if (d) {
      message.info('Selected Date: ' + d.toString())
    }
    this.setState({ date: d })
  }
  render() {
    return (
      <div style={{ width: 300, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange()} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
        <Fade in={this.state.show}>
          <div><button onClick={this.transitionClick()}>transition</button></div>
        </Fade>
      </div>
    )
  }
}

export default Test
