module.exports = function (shipit) {
  const config = require('./src/config')
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/blog_fe',
      deployTo: '/home/blog_fe',
      repositoryUrl: 'https://github.com/oct16/Blog-FE.git',
      branch: 'master',
      ignores: ['.git', 'node_modules', 'README.md', 'shipitfile.js'],
      rsync: ['--del'],
      keepReleases: 1,
      key: '~/.ssh/id_rsa',
      shallowClone: true,
      servers: 'root@97.64.19.248:22'
    }
  })

  shipit.on('published', function () {
    return shipit.start(['install', 'build', /*'config',*/ 'clean', 'runServer'])
  })

  shipit.blTask('install', function() {
    return shipit.remote(`cd ${shipit.currentPath} && yarn install`)
  })

  shipit.blTask('cleanDocker', function() {
    return shipit.remote(` docker stop blog_fe || true & docker rm -f blog_fe || true`)
  })

  shipit.blTask('clean', function() {
    return shipit.remote(`pm2 delete blog || true`)
  })

  shipit.blTask('build', function() {
    return shipit.remote(`cd ${shipit.currentPath} && yarn build:prod`)
  })

  shipit.blTask('config', function() {
    return shipit.remote(`cd ${shipit.currentPath} && cp -rf tools/nginx/conf/* /usr/local/nginx/conf/ && nginx -s reload`)
  })

  shipit.blTask('runServer', function() {
    return shipit.remote(`cd ${shipit.currentPath}/build && pm2 start server.js --name blog`)
  })

  shipit.blTask('runDocker', function() {
    return shipit.remote(`docker run -p 3010:3010 -d --name blog_fe -v ${shipit.currentPath}:/app node /bin/bash -c "cd /app/build && node server.js"`)
  })
}
