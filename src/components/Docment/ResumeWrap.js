import React from 'react';
import Resume from './Resume';
import s from './ResumeWrap.css';
import Link from 'components/Link';
import PropTypes from 'prop-types';

class A4 extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  }

  componentDidMount() {
    if (global.window) {
      global.window.onload = () => {
        particlesJS.load('particles-js', 'vendor/particles/particles.json', function() {
          console.log('callback - particles-js config loaded');
        });
      }
    }
  }

  printPage = () => {
    var newWin = window.open('', '_self', '')
    const links = document.querySelectorAll("link")
    const styles = document.querySelectorAll("style")
    const html = document.querySelector("#resume").outerHTML
    newWin.document.write(`<head>${ [
      ...styles,
      ...links
    ].map(i => i.outerHTML).join("")}</head>`)
    newWin.document.write(`<body>${html}</body>`)
    setTimeout(() => {
      newWin.print()
      newWin.location.reload()
    }, 1000)
  }

  render() {

    return (
      <div className={s.root}>
        <style dangerouslySetInnerHTML={{ __html: `
          .particles-js-canvas-el {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
          }
          ` }}></style>
        <div id="particles-js" className={s.container}>
          <div className={s.actions}>
            <a className="button" href="mailto:?cc=mail@fengfan.me&subject=转发--冯小帆的简历--Web前端工程师&body=简历地址 https://oct16.cn/resume">转发简历</a>
            {/* <a className="button" href="/resume-purty.pdf">下载简历</a> */}
            <a className="button" onClick={this.printPage}>打印简历</a>
          </div>
          <Resume {...this.props}/>
        </div>
        <script src="vendor/particles/particles.js"></script>
      </div>
    )
  }
}

export default A4
