module.exports = function (shipit) {
  const config = require('./src/config')
  require('/Users/oct16/.config/yarn/global/node_modules/shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/blog_fe',
      deployTo: '/home/blog_fe',
      repositoryUrl: 'https://github.com/oct16/Blog-FE.git',
      branch: 'master',
      ignores: ['.git', 'node_modules', 'README.md', 'shipitfile.js'],
      rsync: ['--del'],
      keepReleases: 5,
      key: '~/.ssh/id_rsa',
      shallowClone: true,
      servers: 'root@97.64.19.213:27471'
    }
  })

  shipit.on('published', function () {
    return shipit.start(['install', 'clearn', 'build', 'config', 'run'])
  })

  shipit.blTask('install', function() {
    return shipit.remote(`cd ${shipit.currentPath} && yarn install`)
  })

  shipit.blTask('clearn', function() {
    return shipit.remote(` docker stop blog_fe || true & docker rm -f blog_fe || true`)
  })

  shipit.blTask('build', function() {
    return shipit.remote(`cd ${shipit.currentPath} && yarn build -- --release --static`)
  })

  shipit.blTask('config', function() {
    return shipit.remote(`cd ${shipit.currentPath} && cp -rf tools/nginx/* /usr/local/nginx/conf/ && nginx -s reload`)
  })

  shipit.blTask('run', function() {
    return shipit.remote(`docker run -p 3010:3010 -d --name blog_fe -v ${shipit.currentPath}:/app node /bin/bash -c "cd /app/build && node server.js"`)
  })
}
