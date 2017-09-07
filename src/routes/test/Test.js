import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, message } from 'antd'

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
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
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange()} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
      </div>
    )
  }
}

export default Test
