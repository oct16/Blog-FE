import React from 'react';
import s from './A4.css';
import Link from 'components/Link';
import PropTypes from 'prop-types';

class A4 extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  }

  printPage = () => {
    var newWin = window.open('', '_self', '')
    const links = document.querySelectorAll("link")
    const styles = document.querySelectorAll("style")
    const html = document.querySelector("#resume").outerHTML
    newWin.document.write(`<head>${[...styles, ...links].map( i => i.outerHTML).join("")}</head>`)
    newWin.document.write(`<body>${html}</body>`)
    setTimeout(() => {
      newWin.print()
      newWin.location.reload()
    }, 1000)
  }

  render() {

    const { html, title } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.actions}>
            <button>下载简历</button>
            <button>转发简历</button>
            <button onClick={this.printPage}>打印简历</button>
          </div>
          <div id="resume" size="A4" className={s.page}>
            <h1 style={{'textAlign': 'center'}}>简历</h1>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default A4
