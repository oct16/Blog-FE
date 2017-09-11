import NProgress from 'nprogress'
import './index.css'

let loading = NProgress

if (!global.document) {
  loading.start = function () {}
}

export default loading
