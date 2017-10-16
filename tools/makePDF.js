var fs = require('fs')
var pdf = require('html-pdf')
import path from 'path'

function cover(p) {
  return new Promise((resolve, reject) => {
    const dirPath = path.resolve(__dirname, '../build/public')
    var html = fs.readFileSync(`${dirPath}${p}.html`, 'utf8')
    var options = {
      // "height": "29.7cm",        // allowed units: mm, cm, in, px
      // "width": "21cm",
      "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
      "renderDelay": 3000,

      "border": {
        "top": ".5in",            // default is 0, units: mm, cm, in, px
        "right": ".5in",
        "bottom": ".5in",
        "left": ".5in"
      },

      "base": `http://localhost:3010${p}`, // Base path that's used to load files (images, css, js) when they aren't referenced using a host
    }

    pdf.create(html, options).toFile(`${dirPath}/${p}.pdf`, (err, res) => {
      if (err) return console.log(err)
      console.log(res.filename) // { filename: '/app/businesscard.pdf' }
      resolve()
    })
  })
}

export default function (array = []) {
  let P = Promise.resolve()
  array.forEach(path => {
    P = P.then(() => {
      return cover(path)
    })
  })
  return P
}
