import createBrowserHistory from 'history/createBrowserHistory';
import config from 'config';

// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history

let history = {}
if (process.env.BROWSER) {
  history = createBrowserHistory()
  const push = history.push
  history.push = function(path) {
    push(config.rootPath + path)
  }
}
export default history
// export default process.env.BROWSER && createBrowserHistory()
