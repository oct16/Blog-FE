import React from 'react'
import s from './Header.css'
import Link from '../Link'
import Navigation from '../../containers/navigation'
import logoUrl from './logo-small.png'
import logoUrl2x from './logo-small@2x.png'
import cs from 'classnames'
class Header extends React.Component {

  constructor () {
    super()
    this.state = {
      isHeaderHidden: false
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={cs(s.container, this.state.isHeaderHidden ? s.hidden : '')}>
          <Navigation/>
        <Link className={s.logo} to="/home">
            {/* <img src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="38" height="38" alt="React" /> */}
          <span className={s.logoTxt}>Oct16</span>
          </Link>
        </div>
      </div>
    );
  }

  componentDidMount () {
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (top >= 50 && !this.state.isHeaderHidden) {
        this.setState({
          isHeaderHidden: true
        })
      } else if (top < 50 && this.state.isHeaderHidden) {
        this.setState({
          isHeaderHidden: false
        })
      }
    })
  }
}

export default Header
