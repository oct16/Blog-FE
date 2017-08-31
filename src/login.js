const oAuth = require('./config').oAuth;
import express from 'express'
import createFetch from './createFetch';

let router = express.Router()

router.get('/github', (req, res) => {
    const state = +new Date()
    const url = `https://github.com/login/oauth/authorize?client_id=${oAuth.github.clientID}&state=${state}`
    res.redirect(301, url);
  })

router.get('/github/callback', async (req, res) => {
    const code = req.query.code
    const fetch = createFetch({})

    const accessToken = await fetch(`https://github.com/login/oauth/access_token?code=${code}&client_id=${oAuth.github.clientID}&client_secret=${oAuth.github.clientSecret}`)
    .then(response => {
      if (response.ok) {
        return response.text()
      } else {
        return Promise.reject(response.text())
      }
    })
    .then(data => {
      const matchResult = data.match(/access_token=([\w\d]+)&/)
      if (matchResult) {
        const access_token = matchResult[1]
        return access_token
      }
    })
    .catch(error => console.log(error))

    if (accessToken) {
      const user = await fetch(`https://api.github.com/user?access_token=${accessToken}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.text())
        }
      })
      .catch(error => console.log(error))

      // To Register...
      const oAuthData = await fetch('/api/v1/oauth/register',
        {
          method: "POST",
          credentials : 'include',
          body: JSON.stringify({
            login: user.login,
            name: user.name,
            email: user.email,
            avatar: user.avatar_url,
            p_id: user.id,
            platform: 'github'
          })
        }
      )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res.text())
        }
      })
      .catch(err => { console.log('oAuthData err',err) })
      res.cookie('token_tp', oAuthData.token, { httpOnly: true });
      res.redirect(301, req.headers.referer)
    }
  })

export { router }
