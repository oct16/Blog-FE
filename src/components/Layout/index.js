import React from 'react'
import PropTypes from 'prop-types'

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css'
import resetcss from '../../styles/reset.less'
import hljscss from '../../styles/hljs.css'

// import normalizeCss from 'normalize.css'

// import s from './Layout.css'


import Header from '../Header'
import Footer from '../Footer'

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout
