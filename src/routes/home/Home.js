import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.jpeg'
import github from './github.svg'
import weibo from './weibo.svg'
import zhihu from './zhihu.svg'
import mail from './mail.svg'
import blog from './blog.svg'
import facebook from './facebook.svg'
import Link from 'components/Link'
import s from './Home.css'
import Footer from 'components/Footer'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      show: false
    }
  }

  componentDidMount () {

  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.logo}>
            <Link to="/posts">
              <img src={logo} />
            </Link>
          </div>
          <div className={s.name}>Oct16</div>
          <div className={s.description}>
            Frontend Developer / 程序猿 / 前端汪

          </div>
          <ul className={s.intro}>
            <li><a target="_blank" href="https://github.com/oct16"><img src={github}/></a></li>
            <li><a target="_blank" href="https://weibo.com/windsail1990"><img src={weibo}/></a></li>
            <li><a target="_blank" href="https://www.zhihu.com/people/oct16"><img src={zhihu}/></a></li>
            <li><a target="_blank" href="mailto:mail@fengfan.me"><img src={mail}/></a></li>
            <li><a target="_blank" href="https://facebook.com/fengfan.me"><img src={facebook}/></a></li>
            <li><Link to="/posts"><img src={blog}/></Link></li>
          </ul>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Home
