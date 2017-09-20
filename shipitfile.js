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
      servers: 'root@45.76.207.106'
    }
  })



  shipit.on('published', function () {
    return shipit.start(['install', 'clearn', 'build', 'run'])
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

  shipit.blTask('run', function() {
    // docker run -e VIRTUAL_HOST=oct16.cn -p 3010:3010 -d --name blog_fe --link blog_be:server -v /home/blog_fe/current:/app node /bin/bash -c "cd /app/build && node server.js"
    return shipit.remote(`docker run -e VIRTUAL_HOST=${config.domain} -p 3010:3010 -d --name blog_fe --link blog_be:server -v ${shipit.currentPath}:/app node /bin/bash -c "cd /app/build && node server.js"`)
  })
}
