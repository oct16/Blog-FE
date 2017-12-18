import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.jpeg'
import github from './github.svg'
import weibo from './weibo.svg'
import zhihu from './zhihu.svg'
import mail from './mail.svg'
import blog from './blog.svg'
import facebook from './facebook.svg'
import linkin from './linkin.svg'
import twitter from './twitter.svg'
import googleSearch from './google-search.svg'
import Link from 'components/Link'
import s from './Home.css'
import Footer from 'components/Layout/Footer'
import history from 'history'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  onEnter (e) {
    if (e.keyCode === 13) {
      const url = `https://gg.oct16.cn/search?q=${e.target.value}`
      window.open(url, '_blank');
    }
  }

  render() {
    return (<div className={s.root}>
      <div className={s.search}>
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
        <input type="text" autofocus="true" onKeyDown={this.onEnter.bind(this)}/>
        <img className={s.googleSearch} src={googleSearch}/>
      </div>
      <div className={s.container}>
        <div className={s.myself}>
          <div className={s.logo}>
            <Link to="/posts">
              <img src={logo}/>
            </Link>
          </div>
          <div className={s.name}>Oct16</div>
          <div className={s.description}>
            Frontend Developer / 程序猿 / 前端汪
          </div>
          <ul className={s.intro}>
            <li>
              <a target="_blank" href="https://github.com/oct16"><img src={github}/></a>
            </li>
            <li>
              <a target="_blank" href="https://weibo.com/windsail1990"><img src={weibo}/></a>
            </li>
            <li>
              <a target="_blank" href="https://www.zhihu.com/people/oct16"><img src={zhihu}/></a>
            </li>
            <li>
              <a target="_blank" href="mailto:mail@fengfan.me"><img src={mail}/></a>
            </li>
            <li>
              <a target="_blank" href="https://facebook.com/fengfan.me"><img src={facebook}/></a>
            </li>
            <li>
              <a target="_blank" href=""><img src={twitter}/></a>
            </li>
            <li>
              <a target="_blank" href=""><img src={linkin}/></a>
            </li>
            <li>
              <Link to="/posts"><img src={blog}/></Link>
            </li>
          </ul>
          <Footer/>
        </div>
      </div>
    </div>)
  }
}

export default Home
