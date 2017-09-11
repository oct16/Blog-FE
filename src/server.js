import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOM from 'react-dom/server'
import PrettyError from 'pretty-error'
import App from 'components/App'
import Html from 'components/Html'
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage'
// import errorPageStyle from './routes/error/ErrorPage.css'
import createFetch from './createFetch'
import router from './router'
import assets from './assets.json'
import config from './config'
import proxy from './proxy'

import configureStore from './store/configureStore'
import { setSuperUser } from './actions/user'
import { Provider } from 'react-redux'

const app = express()

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

app.use('/api', proxy)
//
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
// app.get('/', function (req, res) {
//   res.redirect(301, config.rootPath)
// })

app.use('/login', require('./login').router)

app.get([config.rootPath + '/*', config.rootPath],
  function (req, res, next) {
    let token = req.cookies.token
    jwt.verify(token, config.auth.jwt.secret, function(err, decoded) {
      req.superUser = decoded
      next()
    })
  },
  function (req, res, next) {
    let token = req.cookies.token_tp
    jwt.verify(token, config.auth.jwt.secret + '_tp', function(err, decoded) {
      req.user = decoded
      next()
    })
  },
  async (req, res, next) => {
  try {

    // const css = new Set()
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html

    // redux initial --------------------------
    const superUser = req.superUser
    const user = req.user
    // Compile an initial state
    const preloadedState = { user, superUser }
    // Create a new Redux store instance
    const store = configureStore(preloadedState)

    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      // insertCss: (...styles) => {
      //   // eslint-disable-next-line no-underscore-dangle
      //   styles.forEach(style => css.add(style._getCss()))
      // },
      // Universal HTTP client
      fetch: createFetch({
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie
      }),
      store
    }

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    })

    if (route.redirect) {
      res.redirect(route.status || 302, config.rootPath + route.redirect)
      return
    }

    const data = { ...route, preloadedState, store }
   //----------------------------------------

    data.children = ReactDOM.renderToString(
      <Provider store={store}>
        <App context={context}>{route.component}</App>
      </Provider>
    )
    data.styles = [
      assets.client.css
    ]
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ]
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js)
    }
    data.app = {
      apiUrl: config.api.clientUrl,
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res, next) => {
  console.error(pe.render(err))

  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      // styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  )

  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})

//
// Launch the server
// -----------------------------------------------------------------------------
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`)
  })
