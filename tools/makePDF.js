var fs = require('fs')
var pdf = require('html-pdf')
import path from 'path'

function cover(p) {
  const dirPath = path.resolve(__dirname, '../build/public')
  var html = fs.readFileSync(`${dirPath}${p}.html`, 'utf8')
  var options = {
    "height": "29.7cm",        // allowed units: mm, cm, in, px
    "width": "21cm",
    // "base": "http://localhost:3010/resume/purty", // Base path that's used to load files (images, css, js) when they aren't referenced using a host
  }

  pdf.create(html, options).toFile(`${dirPath}/${p}.pdf`, function(err, res) {
    if (err) return console.log(err)
    console.log(res) // { filename: '/app/businesscard.pdf' }
  })
}

export default function (array = []) {
  let P = Promise.resolve()
  array.forEach(path => {
    P = P.then(() => {
      cover(path)
      return
    })
  })
  return P
}
