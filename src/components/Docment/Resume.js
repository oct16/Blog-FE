import React from 'react';
import Link from 'components/Link';
import s from './ResumeWrap.css';
import PropTypes from 'prop-types';

class Resume extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  }

  render() {

    const { html, title } = this.props;

    return (
      <div id="resume" size="A4" className={s.page}>
        <h1 style={{'textAlign': 'center'}}>简历</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export default Resume
